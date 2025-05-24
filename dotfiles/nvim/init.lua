-- bootstrap lazy.nvim, LazyVim and your plugins
require("config.lazy")

vim.api.nvim_create_autocmd("BufEnter", {
  pattern = "*",
  callback = function()
    local filepath = vim.fn.expand("%:p")
    local search_path = vim.fn.fnamemodify(filepath, ":p:h") .. ";"
    local git_dir = vim.fn.finddir(".git", search_path)

    local project_root
    if git_dir ~= "" then
      -- Get the parent of the .git directory (i.e., project root)
      local abs_project_root = vim.fn.fnamemodify(git_dir, ":p:h:h")
      project_root = vim.fn.fnamemodify(abs_project_root, ":t")
    else
      -- Fallback to current file's parent directory name
      project_root = vim.fn.fnamemodify(filepath, ":p:h:t")
    end
    vim.opt.titlestring = "~ " .. project_root
    vim.opt.title = true
  end,
})
