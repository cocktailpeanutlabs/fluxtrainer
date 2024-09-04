module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone -b sd3 https://github.com/peanutcocktail/fluxtrainer app",
        ]
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install -r requirements.txt",
          "pip uninstall -y diffusers[torch] torch torchaudio torchvision",
          "pip install -r ui_requirements.txt"
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    {
      method: "fs.download",
      params: {
        uri: [
          "https://huggingface.co/cocktailpeanut/xulf-dev/resolve/main/flux1-dev.sft?download=true",
          "https://huggingface.co/cocktailpeanut/xulf-dev/resolve/main/ae.sft?download=true",
          "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/clip_l.safetensors?download=true",
          "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp16.safetensors?download=true",
        ],
        dir: "app/fluxtrainer/models"
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
