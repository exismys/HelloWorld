return {
    {
        "rebelot/kanagawa.nvim",
        name = "kanagawa",
        priority = 1000,
        opts = {
            compile = false, -- enable compiling the colorscheme
            undercurl = true, -- enable undercurls
            commentStyle = { italic = true },
            functionStyle = {},
            keywordStyle = { italic = true },
            statementStyle = { bold = true },
            typeStyle = {},
            transparent = true,
            dimInactive = false, -- dim inactive window `:h hl-NormalNC`
            terminalColors = true, -- define vim.g.terminal_color_{0,17}
            theme = "wave", -- Load "wave" theme
            background = { -- map the value of 'background' option to a theme
                dark = "dragon", -- try "dragon" !
                light = "lotus",
            },
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
                    Visual = { bg = "#3b4252" },
                }
            end,
        },
    },
    {
        "LazyVim/LazyVim",
        opts = {
            colorscheme = "kanagawa",
        },
    },
}
