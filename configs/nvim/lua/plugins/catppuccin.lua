  return { 
    "catppuccin/nvim", 
    name = "catppuccin", 
    priority = 1000,
    
    config = function()
      require("catppuccin").setup({
        transparent_background = true
      })
      vim.cmd.colorscheme "catppuccin"
    end
  }

--return  { "ellisonleao/gruvbox.nvim", priority = 1000 , 
--  config = function()
--    vim.cmd.colorscheme "gruvbox"
--  end
--}
