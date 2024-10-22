console.log("Processo Principal")

//importação de pacotes
//nativeTheme (forçar m tema no Sistema operacional)
//Menu (criar um menu personalizado)
// shell (acessar um lik externo)
const { app, BrowserWindow, nativeTheme, Menu } = require('electron/main')
const path = require('node:path')

//janela principal
let win // importante neste projeto o escopo da variavel win deve ser global
function createWindow () {
  nativeTheme.themeSource = 'dark' // janela sempre escura
  win = new BrowserWindow({
    width: 1010, //largura em pixels
    height: 720, // altura em pixels
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Menu  personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
 win.loadFile('./src/views/index.html')
}
//Janela sobre 
function aboutwindow() {
  nativeTheme.themeSource = 'dark'
  const about = new BrowserWindow({
    width: 360,
    height: 220,
    autoHideMenuBar: true, //esconder o menu
    resizable: false, //impedir redimensionamento
    minimizable: false, // impedir minimizar a janela
    titleBarStyle: 'hidden' //esconder a barra de estilo EXEMPLO: totem de auto atendimento
  })
  about.loadFile('./src/views/sobre.html')
}



// execução assincrona da janela do aplicativo electrom
app.whenReady().then(() => {
  createWindow()
  
// comportamento do MAC ao fechar uma janela
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
//encerrar a aplicação quando a janela for fechada (windows e Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//template do menu
const template = [
  {
    label: 'Arquivo',
    submenu:[
      {
        label: 'Novo',
        accelerator: 'CmdOrCtrl+N',
      },
      {
        label: 'Abrir',
        accelerator: 'CmdOrCtrl+O',
      },
      {
        label: 'Salvar',
        accelerator: 'CmdOrCtrl+S',
      },
      {
        label: 'Salvar como',
        accelerator: 'CmdOrCtrl+Shift+S',
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Editar',
    submenu: [
      {
        label: 'desfazer',
        role: 'undo'
      },
      {
        label: 'refazer',
        role: 'redo'
      },
      {
        type: 'separator',
      },
      {
        label: 'Recortar',
        role: 'cut'
      },
      {
        label: 'Copiar',
        role: 'copy'
      },
      {
        label: 'Colar',
        role: 'paste'
      },
       
      
    ]
  },
  {
    label: 'Zoom',
    submenu: [
      {
        label: 'aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar Zoom padrão',
        role: 'resetZoom'
      },
    ]
  },
  {
    label: 'Cor',
    submenu: [
      {
        label: 'Amarelo'
      },
      {
        label: 'Azul'
      },
      {
        label: 'Laranja'
      },
      {
        label: 'Pink'
      },
      {
        label: 'Roxo'
      },
      {
        label: 'Verde'
      },
      {
        type: 'separator'
      },
      {
        label: 'Restaurar a cor padrão'
      },
    ]
  },
  {
    label: 'ajuda',
    submenu: [
      {
        label: 'Repositorio',
        click: () => shell.openExternal('https://github.com/izaaksamuel/minidev.git')
      },
      {
        label: 'Sobre',
        click: () => aboutwindow()
      }
    ]
  }
]