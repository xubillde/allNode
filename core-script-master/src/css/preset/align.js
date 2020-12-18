




// 行高垂直居中 
export const lineVerticalAlign = (tab) => `${tab}height: height;
${tab}line-height: height;`

// 定位垂直居中
export const verticalAlign = (tab) => `${tab}position: 'absolute';
${tab}top: 50%;
${tab}transform: translate(0, -50%);`

// 定位水平居中
export const horizontalAlign = (tab) => `${tab}osition: 'absolute';
${tab}left: 50%;
${tab}transform: translate(-50%, 0);`

// 完全居中
export const fullAlign = (tab) => `${tab}position: absolute;
${tab}top: 50%;
${tab}left: 50%;
${tab}transform: translate(-50%, -50%);`
