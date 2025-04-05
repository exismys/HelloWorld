local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not (vim.uv or vim.loop).fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end

vim.opt.rtp:prepend(lazypath)

require("vim-options")
require("lazy").setup("plugins")

-- Function to set the title dynamically
vim.api.nvim_create_autocmd("BufEnter", {
    pattern = "*",
    callback = function()
        local dir = vim.fn.expand("%:p:h:t")  -- Get parent directory name
        local file = vim.fn.expand("%:t")      -- Get current file name
        vim.opt.titlestring = "nvim - " .. dir .. "/" .. file
        vim.opt.title = true
    end,
})

