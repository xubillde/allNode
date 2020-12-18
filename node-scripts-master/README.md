# node-scripts

积累的 node 脚本工具

## 列表如下

- 文本文件合并 [file-merge.js](file-merge.js)

```bash
node file-merge.js \
 --source=./src \
 --output=merge.txt \
 --includes="js|jsx|ts|tsx|json|scss" \
 --exclude="dist|node_modules"
```
