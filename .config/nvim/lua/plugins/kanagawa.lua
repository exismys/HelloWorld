 return {
   -- this is a comment
  "rebelot/kanagawa.nvim",
  name = "kanagawa",
  priority = 1000,
  config = function()
    require("kanagawa").setup({
      transparent = true,
      colors = {
        theme = {
          all = {
            ui = {
              bg_gutter = "none",
              float = { bg = "none" },
            },
          },
        },
        palette = {
          waveBlue1 = "#1e2030",
          springViolet1 = "#938aa9",
          waveAqua2 = "#7e9cd8",
          samuraiRed = "#E46876",
          dragonBlue = "#658594",
        },
      },
      overrides = function(colors)
        return {
          Normal = { bg = "none" },
          Comment = { fg = colors.palette.springViolet1, italic = true },
          Keyword = { fg = colors.palette.samuraiRed, bold = true },
          Function = { fg = colors.palette.waveAqua2, bold = true },
          String = { fg = colors.palette.dragonBlue },
        }
      end,
    })
    vim.cmd.colorscheme "kanagawa"
  end
}
