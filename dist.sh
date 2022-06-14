git add dist
git commit -m "web-build-$(date)"
git push
git subtree push --prefix dist origin gh-pages