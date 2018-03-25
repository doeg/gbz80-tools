# GBz80 Tools Examples
The following instructions are for OSX.


## Prerequisites

```bash
# First, install [RGBDS](https://github.com/rednex/rgbds).
# This contains the assembler and linker for building the z80 assembly.
# For full instructions, see: https://github.com/rednex/rgbds.
brew install rgbds

# Install XQuartz (required by Wine): https://www.xquartz.org/
brew cask install xquarts

# Install Wine: https://dl.winehq.org/wine-builds/macosx/download.html
brew install wine
```

Finally, install the BGB emulator, for running ROMs: http://bgb.bircd.org/#downloads

### Running the example

The following commands should be run from the `examples/` directory:

```bash
# Build the .gb ROM file
make

# Run the ROM in the emulator
wine ~/path/to/bgb.exe example.gb
```
