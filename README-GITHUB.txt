RAMCHANDRA KANADE PORTFOLIO

1. Put this folder in your desired location.
2. Rename/keep the main file as index.html.
3. Open PowerShell inside this folder.
4. Run:
   git init
   git add .
   git commit -m "Deploy portfolio website"
   git branch -M main
   git remote add origin https://github.com/Ramchandrakanade/My-portfolio.git
   git push -u origin main
5. On GitHub: Repository -> Settings -> Pages -> Deploy from a branch -> main -> / (root) -> Save.

IMPORTANT: The assets folder is not included in this package because it was not available in the current working files. Add your existing assets/ folder beside index.html before pushing if your portfolio uses local certificate/logo/resume files.
