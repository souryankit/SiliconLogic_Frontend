// update-deps.js - Script to update package.json
const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Dependencies to remove (identified as unused)
const depsToRemove = [
  '@react-pdf/renderer',
  '@testing-library/jest-dom',
  '@testing-library/react',
  '@testing-library/user-event',
  'axios',
  'boxicons',
  'feather-icons',
  'firebase-tools',
  'google-map-react',
  'lucide-react',
  'modules',
  'node',
  'react-bootstrap-sidebar-menu',
  'react-card-slider-component',
  'react-datepicker',
  'react-pdf',
  'react-script',
  'web-vitals'
];

// DevDependencies to remove
const devDepsToRemove = [
  'autoprefixer',
  'postcss',
  'tailwindcss'
];

// Dependencies to add (identified as missing)
const depsToAdd = {
  'chart.js': '^4.4.0',
  'eslint-config-react-app': '^7.0.1'
};

// Create a backup of package.json
function backupPackageJson() {
  try {
    // Read the original package.json
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    
    // Create backup directory if it doesn't exist
    const backupDir = path.join(__dirname, 'backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Create timestamped backup file
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupPath = path.join(backupDir, `package.json.${timestamp}`);
    
    // Write the backup
    fs.writeFileSync(backupPath, packageJsonContent);
    console.log(`📦 Backed up package.json → ${backupPath}`);
    
    return true;
  } catch (err) {
    console.error(`❌ Error backing up package.json: ${err.message}`);
    return false;
  }
}

// Update the package.json
function updatePackageJson() {
  try {
    // Read and parse package.json
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    // Keep track of removed dependencies
    const removedDeps = [];
    const removedDevDeps = [];
    
    // Remove main dependencies
    if (packageJson.dependencies) {
      depsToRemove.forEach(dep => {
        if (packageJson.dependencies[dep]) {
          delete packageJson.dependencies[dep];
          removedDeps.push(dep);
        }
      });
    }
    
    // Remove dev dependencies
    if (packageJson.devDependencies) {
      devDepsToRemove.forEach(dep => {
        if (packageJson.devDependencies[dep]) {
          delete packageJson.devDependencies[dep];
          removedDevDeps.push(dep);
        }
      });
    }
    
    // Add missing dependencies
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
    
    const addedDeps = [];
    Object.entries(depsToAdd).forEach(([dep, version]) => {
      if (!packageJson.dependencies[dep]) {
        packageJson.dependencies[dep] = version;
        addedDeps.push(dep);
      }
    });
    
    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    // Print results
    console.log('\n📊 Package.json Update Summary:');
    console.log(`✅ Removed dependencies: ${removedDeps.length > 0 ? removedDeps.join(', ') : 'None'}`);
    console.log(`✅ Removed devDependencies: ${removedDevDeps.length > 0 ? removedDevDeps.join(', ') : 'None'}`);
    console.log(`✅ Added dependencies: ${addedDeps.length > 0 ? addedDeps.join(', ') : 'None'}`);
    
    return true;
  } catch (err) {
    console.error(`❌ Error updating package.json: ${err.message}`);
    return false;
  }
}

// Main function to run the update
function runUpdate() {
  console.log('🔄 Starting package.json update...');
  
  // Backup first
  if (!backupPackageJson()) {
    console.error('❌ Failed to back up package.json. Aborting.');
    return;
  }
  
  // Update package.json
  if (updatePackageJson()) {
    console.log('\n✅ Successfully updated package.json');
    console.log('\n⚠️ IMPORTANT: You should now run "npm install" to apply these changes');
    console.log('⚠️ Test your application thoroughly after updating dependencies!');
  } else {
    console.error('\n❌ Failed to update package.json');
  }
}

// Run the update process
runUpdate(); 