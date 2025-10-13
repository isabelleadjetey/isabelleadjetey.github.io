def parse_line(line): 
    parts = line.strip().split(" ", 2)
    if len(parts)<3:
        return None
    timestamp, level, message = parts
    return {"timestamp": timestamp,"level":level, "message":message}




def count_levels(path):

    counts={}
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            p = parse_line(line)
            if not p:
                continue
            counts[p["level"]] = counts.get(p["level"], 0) + 1

    return counts



if __name__ == "__main__":
    summary = count_levels("sample.log")
    for level, c in summary.items():
        print(f"{level}: {c}")
        
