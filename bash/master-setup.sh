#!/bin/bash

echo "********** Welcome to master installation setup **********"
echo ""

# Update the system
echo "***** Updating the system *****"
sudo apt update && sudo apt upgrade -y

# Install curl
echo "***** Installing curl *****"
echo ""
sudo apt install curl -y

# Setup Zsh
echo "***** Setting up ZSH and oh-my-zsh"
echo ""
sudo apt install zsh -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install Git
echo "***** Setting up git *****"
echo ""
sudo apt install git -y
git --version

# Install pip
echo "***** Setting up pip *****"
echo ""
sudo apt install python3-pip -y

# Setup Neovim
echo "***** Installing Neovim *****"
echo ""
sudo add-apt-repository ppa:neovim-ppa/stable -y
sudo apt update
sudo apt install neovim -y

# Setup Golang 
echo "***** Setting up Golang *****"
echo ""
curl -LO https://go.dev/dl/go1.24.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.24.0.linux-amd64.tar.gz
echo "Updating path..."
echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.oh-my-zsh/custom/programs.zsh

# Install dependencies for Golang Raylib bindings
echo "***** Setting up dependencies for Golang Raylib bindings"
echo ""
sudo apt-get install libgl1-mesa-dev libxi-dev libxcursor-dev libxrandr-dev libxinerama-dev libwayland-dev libxkbcommon-dev

# Install dependencies for Golang oto
echo "***** Setting up dependencies for Golang oto package *****"
echo ""
sudo apt install pkg-config -y
sudo apt install libasound2-dev -y

# Setup nvm and node
echo "***** Setting up nvn and node *****"
echo ""
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 22

# Install htop
echo "***** Installing htop *****"
echo ""
sudo apt install htop -y

# Install vlc
echo "***** Installing vlc *****"
echo ""
sudo apt install vlc -y

# Install brave browser
echo "***** Installing brave browser"
echo ""
sudo curl -fsS https://dl.brave.com/install.sh | sh

# Install Heroku CLI
echo "***** Installing heroku CLI"
echo ""
sudo curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# Install xclip
echo "***** Installing xclip *****"
echo ""
sudo apt install xclip -y

# Install ripgrep
echo "****** Installing ripgrep *****"
echo ""
sudo apt install ripgrep -y

# Install cloc
echo "****** Installing cloc *****"
echo ""
sudo apt install cloc -y
