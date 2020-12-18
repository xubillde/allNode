import path from 'path'
import { joinFilesName, getFilesTree } from "./file";

export default function getPages(basePath) {

  return joinFilesName(getFilesTree(path.join(basePath, 'pages')))
    .map(file => file.fullImportPath).filter(file => file.split('/').length > 1)

}