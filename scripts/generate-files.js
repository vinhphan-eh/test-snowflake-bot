const fs = require('fs');
const path = require('path');

const templateFile = path.join(__dirname, '../samples/file1.tsx');
const templateContent = fs.readFileSync(templateFile, 'utf8');

// Create 80 similar files
for (let i = 2; i <= 31; i++) {
  const newFileName = `file${i}.tsx`;
  const newFilePath = path.join(__dirname, '../samples', newFileName);
  
  // Replace the component name in the template
  const newContent = templateContent.replace(
    /const Sample: React.FC =/g,
    `const Sample${i}: React.FC =`
  ).replace(
    /export default Sample;/g,
    `export default Sample${i};`
  );
  
  fs.writeFileSync(newFilePath, newContent);
  console.log(`Created ${newFileName}`);
}

console.log('All files have been generated successfully!'); 