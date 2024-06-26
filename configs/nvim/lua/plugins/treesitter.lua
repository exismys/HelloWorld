  return {
    "nvim-treesitter/nvim-treesitter", 
    build = ":TSUpdate",
    config = function()
      local configs = require("nvim-treesitter.configs")
      configs.setup({
        ensure_installed = {"lua", "javascript", "go", "python", "html", "css"},
        sync_install = false,
        hightlight = {enable = true },
        indent = { enable = true }
      })
    end
  }
