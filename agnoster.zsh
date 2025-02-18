# vim:ft=zsh ts=2 sw=2 sts=2
#
# Robust Agnoster-ZSH-Theme with Powerline support

# Enable necessary ZSH options
setopt PROMPT_SUBST     # Allow expansion in prompts
setopt PROMPT_CR        # Preserve partial lines
setopt PROMPT_SP        # Clear right prompt on accept

### Powerline Configuration
# Use Powerline-patched font symbols
SEGMENT_SEPARATOR=$'\ue0b0'      # 
BRANCH_SYMBOL=$'\ue0a0'          # 

### Color Configuration
typeset -Ag FX FG BG

FX=(
    reset     "%{[00m%}"
    bold      "%{[01m%}" no-bold      "%{[22m%}"
    italic    "%{[03m%}" no-italic    "%{[23m%}"
    underline "%{[04m%}" no-underline "%{[24m%}"
    blink     "%{[05m%}" no-blink     "%{[25m%}"
    reverse   "%{[07m%}" no-reverse   "%{[27m%}"
)

for color in {000..255}; do
    FG[$color]="%{[38;5;${color}m%}"
    BG[$color]="%{[48;5;${color}m%}"
done

# Theme colors
typeset -Ag ZSH_THEME
ZSH_THEME[dir_bg]=33
ZSH_THEME[dir_fg]=15
ZSH_THEME[git_clean_bg]=2
ZSH_THEME[git_clean_fg]=0
ZSH_THEME[git_dirty_bg]=3
ZSH_THEME[git_dirty_fg]=0
ZSH_THEME[status_bg]=0
ZSH_THEME[status_fg]=15

### Prompt Drawing Functions
CURRENT_BG='NONE'

# Start a segment
prompt_segment() {
  local bg=$1 fg=$2
  [[ $CURRENT_BG != 'NONE' && $bg != $CURRENT_BG ]] && echo -n " %{%K{$bg}%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR%{%F{$fg}%} "
  [[ $bg == $CURRENT_BG ]] && echo -n " %{%F{$fg}%} "
  echo -n "%{%K{$bg}%F{$fg}%} "
  CURRENT_BG=$bg
  [[ -n $3 ]] && echo -n $3
}

# End the prompt
prompt_end() {
  [[ $CURRENT_BG != 'NONE' ]] && echo -n " %{%k%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR"
  echo -n "%{%k%f%}"
  CURRENT_BG='NONE'
}



### Main Prompt Components
prompt_context() {
  prompt_segment 0 15 "%{%F{magenta}%}M1%{%F{yellow}%}A%{%F{cyan}%}i%{%F{blue}%}r%{%F{magenta}%}🚀"
}

prompt_dir() {
  prompt_segment $ZSH_THEME[dir_bg] $ZSH_THEME[dir_fg] "%2~"
}

prompt_status() {
  local symbols
  [[ $RETVAL -ne 0 ]] && symbols+="%{%F{red}%}✘ "
  [[ $UID -eq 0 ]] && symbols+="%{%F{yellow}%}⚡ "
  [[ $(jobs -l | wc -l) -gt 0 ]] && symbols+="%{%F{cyan}%}⚙ "
  [[ -n $symbols ]] && prompt_segment $ZSH_THEME[status_bg] $ZSH_THEME[status_fg] "$symbols"
}

### Build Prompt
build_prompt() {
  RETVAL=$?
  prompt_status
  prompt_context
  prompt_dir
  prompt_end
}

PROMPT='%{%f%b%k%}$(build_prompt) '