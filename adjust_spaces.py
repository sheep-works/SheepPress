import os
import re
import json
import hashlib

# CJK Characters: Hiragana, Katakana, Kanji, and Japanese iteration marks
CJK_CHAR = '[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf\u3005\u3006\u3007]'
# Alphanumeric characters
ENG_CHAR = '[a-zA-Z0-9]'
# Target symbols: 、。！？（）()「」[]% (escaped [ and ] for regex)
SYMBOLS = '、。！？（）()「」\\[\\]%'

def calculate_sha256(content: str) -> str:
    """Calculate SHA-256 hash of a string."""
    return hashlib.sha256(content.encode('utf-8')).hexdigest()

def split_front_matter(text: str) -> tuple[str, str]:
    """Split front matter and body from the text.
    
    If front matter exists at the beginning of the text (starting and ending with ---),
    returns (front_matter, body). Otherwise, returns ("", text).
    """
    match = re.match(r'^---\r?\n(.*?)\r?\n---\r?\n(.*)$', text, re.DOTALL)
    if match:
        # Reconstruct front matter exactly as matched, including the ending delimiter and newline
        matched_front = match.group(0)
        body_start = len(matched_front) - len(match.group(2))
        front_matter = matched_front[:body_start]
        body = matched_front[body_start:]
        return front_matter, body
    else:
        return "", text

def adjust_spaces(text: str) -> str:
    """Adjust spaces in the text based on Japanese-English and symbol patterns,
    while preserving leading indentation (spaces/tabs) on each line.
    """
    lines = text.splitlines(keepends=True)
    adjusted_lines = []
    
    for line in lines:
        # Separate leading indentation (spaces and tabs) from the rest of the line
        match = re.match(r'^([ \t]*)(.*)$', line, re.DOTALL)
        if match:
            indent = match.group(1)
            content = match.group(2)
            
            # Apply space formatting only to the content of the line
            # 1. Insert space between CJK and ENG characters
            content = re.sub(f'({CJK_CHAR})({ENG_CHAR})', r'\1 \2', content)
            content = re.sub(f'({ENG_CHAR})({CJK_CHAR})', r'\1 \2', content)
            
            # 2. Collapse double or multiple spaces into a single space
            content = re.sub(r'  +', ' ', content)
            
            # 3. Remove spaces around specified symbols
            content = re.sub(f' +([{SYMBOLS}])', r'\1', content)
            content = re.sub(f'([{SYMBOLS}]) +', r'\1', content)
            
            adjusted_lines.append(indent + content)
        else:
            adjusted_lines.append(line)
            
    return "".join(adjusted_lines)

def main():
    hash_file = './filehash.json'
    
    # Load existing hashes
    if os.path.exists(hash_file):
        try:
            with open(hash_file, 'r', encoding='utf-8') as f:
                hashes = json.load(f)
        except Exception as e:
            print(f"Error loading hash file: {e}. Starting fresh.")
            hashes = {}
    else:
        hashes = {}
        
    new_hashes = {}
    target_dir = 'contents'
    
    if not os.path.isdir(target_dir):
        print(f"Directory '{target_dir}' not found.")
        return

    processed_count = 0
    skipped_count = 0
    
    for root, dirs, files in os.walk(target_dir):
        # Exclude 'en' and 'zh' folders under contents
        norm_root = os.path.normpath(root)
        rel_root = os.path.relpath(norm_root, target_dir)
        if rel_root == '.':
            dirs[:] = [d for d in dirs if d not in ('en', 'zh')]

        for file in files:
            if not file.endswith('.md'):
                continue
                
            filepath = os.path.join(root, file)
            # Use relative path with forward slashes for consistency
            rel_path = os.path.relpath(filepath).replace('\\', '/')
            
            # Read current content
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
                continue
                
            current_hash = calculate_sha256(content)
            
            # Check if unchanged
            if rel_path in hashes and hashes[rel_path] == current_hash:
                new_hashes[rel_path] = current_hash
                skipped_count += 1
                continue
                
            # Separate front matter and body
            front_matter, body = split_front_matter(content)
            
            # Process body only
            adjusted_body = adjust_spaces(body)
            adjusted_content = front_matter + adjusted_body
            
            # Save back if modified (or even if not, record the current hash)
            if adjusted_content != content:
                try:
                    with open(filepath, 'w', encoding='utf-8', newline='') as f:
                        f.write(adjusted_content)
                    print(f"Formatted spaces: {rel_path}")
                    # Re-calculate hash after modifying
                    final_hash = calculate_sha256(adjusted_content)
                except Exception as e:
                    print(f"Error writing {filepath}: {e}")
                    final_hash = current_hash
            else:
                # No actual modification, keep the current hash
                final_hash = current_hash
                
            new_hashes[rel_path] = final_hash
            processed_count += 1

    # Save updated hashes back to JSON
    try:
        with open(hash_file, 'w', encoding='utf-8') as f:
            json.dump(new_hashes, f, indent=2, ensure_ascii=False)
        print(f"Hash registry saved. Processed/Checked: {processed_count}, Skipped (no change): {skipped_count}")
    except Exception as e:
        print(f"Error saving hash file: {e}")

if __name__ == '__main__':
    main()
