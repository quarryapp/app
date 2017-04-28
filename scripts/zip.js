// require modules
var fs = require('fs');
var archiver = require('archiver');
var chalk = require('chalk');

var outfile = 'build.zip';
var indir = 'build/';

// create a file to stream archive data to.
var output = fs.createWriteStream(`${__dirname}/../${outfile}`);
var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

console.log('Creating a zip for chrome store publication...');

// listen for all archive data to be written
output.on('close', function() {
    console.log(chalk.green('Zipping complete.'));
    console.log(`${chalk.yellow(archive.pointer())} total bytes.`);
    console.log();
    console.log(`Output written from ${chalk.blue(indir)} to ${chalk.blue(outfile)}`);
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
    console.log('Zipping failed.');
    console.log(chalk.red(err));
});

// pipe archive data to the file
archive.pipe(output);

// append files from input directory
archive.directory(indir);

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();