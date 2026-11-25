import re, glob
urls = set()
for path in glob.glob('app/**/*.tsx', recursive=True):
    with open(path, 'r', encoding='utf-8') as f:
        urls.update(re.findall(r'https://lh3\.googleusercontent\.com/[^\s"\'\)]+', f.read()))
for u in sorted(urls):
    print(u)
