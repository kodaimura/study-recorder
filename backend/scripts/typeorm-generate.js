const { spawnSync } = require('child_process');
const path = require('path');

const migrationPath = process.argv[2];

if (!migrationPath) {
    console.error('Usage: npm run migration:generate -- src/migrations/MigrationName');
    process.exit(1);
}

const binary = process.platform === 'win32' ? 'typeorm-ts-node-commonjs.cmd' : 'typeorm-ts-node-commonjs';
const binaryPath = path.join(__dirname, '..', 'node_modules', '.bin', binary);
const args = ['migration:generate', migrationPath, '-d', 'src/data-source.ts', ...process.argv.slice(3)];
const result = spawnSync(binaryPath, args, { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

process.exit(result.status ?? 1);
