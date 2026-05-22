import os
import re

directory = r"C:\Users\isabe\.gemini\antigravity\scratch\portfolio-repo\docs\Progetti\CCNA Journey\02_Knowledge_Base"

for filename in os.listdir(directory):
    if not filename.endswith(".md"):
        continue
    filepath = os.path.join(directory, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        if not lines:
            continue
            
        # Find the title
        title_line_idx = -1
        original_title = ""
        for i, line in enumerate(lines):
            if line.startswith("# "):
                title_line_idx = i
                original_title = line[2:].strip()
                # Clean up title
                original_title = original_title.replace("Recap CCNA:", "").replace("Recap CCNA", "").strip()
                break
                
        if title_line_idx == -1:
            # No H1 found, use filename
            original_title = filename.replace(".md", "").replace("_", " ")
            lines.insert(0, f"# {original_title}\n")
            title_line_idx = 0
            
        # Check if already standardized
        if "📘 CCNA Knowledge Base:" in lines[title_line_idx]:
            continue # Already processed
            
        new_title = f"# 📘 CCNA Knowledge Base: {original_title}\n"
        lines[title_line_idx] = new_title
        
        # Check if Objective block exists
        has_objective = False
        for i in range(title_line_idx + 1, min(title_line_idx + 5, len(lines))):
            if "Obiettivo:" in lines[i]:
                has_objective = True
                break
                
        if not has_objective:
            lines.insert(title_line_idx + 1, "\n> **Obiettivo:** Documento di revisione rapida e configurazione per l'esame CCNA.\n> **Dominio CCNA:** Core Networking\n\n---\n")

        # Check if Cheat sheet exists
        content_str = "".join(lines)
        if "Cheat Sheet" not in content_str:
            lines.append("\n\n---\n\n### 🎯 Cheat Sheet per l'Esame\n*(Sezione riservata a comandi rapidi e QCM per il ripasso finale)*\n")
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("Standardization complete.")
