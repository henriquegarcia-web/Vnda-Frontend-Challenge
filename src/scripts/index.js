(function init () {
  new Header().start(),
  new Feature().start(),
  new Budget().start(),
  new NewsLetter().start(),
  new Footer().start()
})()

function Header() {
  const screenBlocker = document.querySelector('.screen')

  this.start = () => {
    this._menuManager()
    this._menuResponsiveManager()
  }

  this._menuManager = () => {
    const menuItems = document.querySelectorAll('.header__menu ul li a')
    const headerIcons = document.querySelectorAll('.header__icons .header__icon')

    Array.from(menuItems).forEach(menus => menus.addEventListener('click', (clickedMenu) => {
      Array.from(menuItems).forEach((menus) => {
        menus.classList.remove('header__menu--selected')
      })
      clickedMenu.path[0].classList.add('header__menu--selected')
    }))

    Array.from(headerIcons).forEach(icons => icons.addEventListener('click', () => {
      new PopUp().renderPopUp('alert', 'Desculpe! Está função não está ativa no momento')
    }))
  }

  this._menuResponsiveManager = () => {
    const menuResponsiveIcon = document.querySelector('.header__menu_responsive')
    const menuResponsiveContainer = document.querySelector('.header__menu_responsive__container')

    menuResponsiveIcon.addEventListener('click', () => {
      menuResponsiveContainer.classList.toggle('hidden')
      screenBlocker.classList.toggle('hidden')
    })
    screenBlocker.addEventListener('click', () => {
      menuResponsiveContainer.classList.toggle('hidden')
      screenBlocker.classList.add('hidden')
    })
  }

}

function Feature() {
  const featurePlaySoundButton = document.querySelector('.feature .feature__left button')
  const featureEngineSound = document.getElementById('feature__engine_sound')

  this.start = () => {
    this._startEngineSound()
  }

  this._startEngineSound = () => {
    featureEngineSound.volume = 0.6;

    featurePlaySoundButton.addEventListener('click', () => {
      if (featurePlaySoundButton.classList.contains('desactive')) {
        featurePlaySoundButton.classList.remove('desactive')
        featurePlaySoundButton.classList.add('active')
        featurePlaySoundButton.textContent = "Desligar o motor"
        featureEngineSound.play()
      } else {
        featurePlaySoundButton.classList.remove('active')
        featurePlaySoundButton.classList.add('desactive')
        featurePlaySoundButton.textContent = "Ligar o motor"
        featureEngineSound.pause()
      }
    })

    featureEngineSound.addEventListener('ended', () => {
      featurePlaySoundButton.textContent = "Ligar o motor"
    })
  }
}

function Budget() {
  const budgetSelectProduct = document.getElementById('select_motorcycle')
  const budgetVariationsContainer = document.querySelector('.budget .budget__form__variations')
  const budgetPriceContainer = document.querySelector('.budget .budget__form__price')
  const budgetImage = document.querySelector('.budget .budget__image img')

  const products = [
    {
      name: 'gs310',
      variations: [
        {
          id: 'Azul e Cinza',
          price: '27900',
          src: 'budget_gs310_azulecinza.png'
        },
        {
          id: 'Vermelha',
          price: '26900',
          src: 'budget_gs310_vermelha.png'
        }
      ]
    },
    {
      name: 'gs1200',
      variations: [
        {
          id: 'Standard',
          price: '94900',
          src: 'budget_gs1200.png'
        }
      ]
    },
    {
      name: 's1000r',
      variations: [
        {
          id: 'Preta',
          price: '47900',
          src: 'budget_s1000r_preta.png'
        },
        {
          id: 'Vermelha',
          price: '46900',
          src: 'budget_s1000r_vermelha.png'
        }
      ]
    },
    {
      name: 's1000rr',
      variations: [
        {
          id: 'Standard',
          price: '104900',
          src: 'budget_s1000rr.png'
        }
      ]
    }
  ]

  this.start = () => {
    this._budgetManager()
    this._budgetForm()
  }

  this._budgetManager = () => {
    this._renderVariations(budgetSelectProduct.value)
    
    budgetSelectProduct.addEventListener('change', () => {
      this._renderVariations(budgetSelectProduct.value)
    })
  }

  this._renderVariations = (productValue) => {
    budgetVariationsContainer.innerHTML = ''

    let productVariations = products.filter((product) => {
      return product.name === productValue;
    })

    for (let i=0; i<productVariations[0].variations.length; i++) {
      const variation = document.createElement('div')
      variation.classList.add('budget__form__variation')
      variation.setAttribute('data-price', productVariations[0].variations[i].price)
      variation.setAttribute('data-src', `/src/images/budget_images/${productVariations[0].variations[i].src}`)
      variation.innerHTML = productVariations[0].variations[i].id
      budgetVariationsContainer.appendChild(variation)
    }

    Array.from(budgetVariationsContainer.querySelectorAll('.budget__form__variation'))
    .forEach((variations, i) => variations.addEventListener('click', (clickedVariation) => {
      Array.from(budgetVariationsContainer.querySelectorAll('.budget__form__variation'))
      .forEach((variations) => {
        variations.classList.remove('budget__form__variation--selected')
      })
      clickedVariation.path[0].classList.add('budget__form__variation--selected')

      this._updatePrice(clickedVariation.path[0].getAttribute('data-price'))
      this._updateProductImage(clickedVariation.path[0].getAttribute('data-src'))
      return
    }))

    Array.from(budgetVariationsContainer.querySelectorAll('.budget__form__variation'))
    .forEach((variations, i) => {
      if (i == 0) {
        variations.classList.add('budget__form__variation--selected')
        this._updatePrice(variations.getAttribute('data-price'))
        this._updateProductImage(variations.getAttribute('data-src'))
      }
    })
  }

  this._updatePrice = (price) => {
    budgetPriceContainer.innerHTML = moneyMask(price)
  }

  this._updateProductImage = (imageSrc) => {
    budgetImage.setAttribute('src', imageSrc)
  }

  this._budgetForm = () => {
    const budgetInputs = document.querySelectorAll('.budget__form__infos input')
    const budgetInputSubmit = document.querySelector('.budget__form__infos input[type="submit"]')

    let inputsValidate = true

    budgetInputSubmit.addEventListener('click', () => {
      
      Array.from(budgetInputs).forEach((inputs) => {
        if (inputs.value == '') {
          inputsValidate = false
          return
        }
      })

      if (inputsValidate) {
        new PopUp().renderPopUp('positive', 'Dados enviados com sucesso!')
      } else {
        new PopUp().renderPopUp('negative', 'Os campos devem ser preenchidos para enviar!')
      }
      inputsValidate = true
    })
  }
}

function NewsLetter() {
  const newsletterInput = document.querySelector('.newsletter__form input[type="email"]')
  const newsletterInputSubmit = document.querySelector('.newsletter__form input[type="submit"]')

  this.start = () => {
    this._newsLetterManager()
  }

  this._newsLetterManager = () => {
    newsletterInputSubmit.addEventListener('click', () => {
      
      if (newsletterInput.value == '') {
        new PopUp().renderPopUp('negative', 'Os campos devem ser preenchidos para enviar!')
        return
      }

      new PopUp().renderPopUp('positive', 'Dados enviados com sucesso!')
    })
  }
}

function Footer() {
  this.start = () => {
    this._menuResponsiveManager()
  }

  this._menuResponsiveManager = () => {
    const menuResponsiveButton = document.querySelector('.footer__resposive a')
    const menuResponsiveContainer = document.querySelector('.footer__resposive .footer__resposive__menu')

    menuResponsiveButton.addEventListener('click', () => {
      menuResponsiveContainer.classList.toggle('hidden')
      menuResponsiveButton.querySelector('.icon').classList.toggle('rotate')

    })
    menuResponsiveContainer.querySelectorAll('ul li a').forEach(menu => menu.addEventListener('click', () => {
      menuResponsiveContainer.classList.add('hidden')
      menuResponsiveButton.querySelector('.icon').classList.toggle('rotate')
    }))
  }
}

function PopUp() {
  const popupScreen = document.querySelector('.pop-up')
  const popupIconContainer = popupScreen.querySelector('.pop-up__icon .icon')
  const popupMessageContainer = popupScreen.querySelector('.pop-up__message')

  this.renderPopUp = (type, text) => {
    if (type == 'positive') {
      popupIconContainer.style.color = 'green'
      if (popupIconContainer.classList.contains('fa-times-circle'))
        popupIconContainer.classList.remove('fa-times-circle')
      if (popupIconContainer.classList.contains('fa-bell'))
        popupIconContainer.classList.remove('fa-bell')
      popupIconContainer.classList.add('fa-check-circle')
    } else if (type == 'negative') {
      popupIconContainer.style.color = 'red'
      if (popupIconContainer.classList.contains('fa-check-circle'))
        popupIconContainer.classList.remove('fa-check-circle')
      if (popupIconContainer.classList.contains('fa-bell'))
        popupIconContainer.classList.remove('fa-bell')
      popupIconContainer.classList.add('fa-times-circle')
    } else {
      popupIconContainer.style.color = 'black'
      if (popupIconContainer.classList.contains('fa-times-circle'))
        popupIconContainer.classList.remove('fa-times-circle')
      if (popupIconContainer.classList.contains('fa-check-circle'))
        popupIconContainer.classList.remove('fa-check-circle')
      popupIconContainer.classList.add('fa-bell')
    }

    popupMessageContainer.innerHTML = text

    this._showPopUp()
  }

  this._showPopUp = () => {
    popupScreen.classList.remove('hidden')
    setTimeout(() => {
      popupScreen.classList.add('hidden')
    }, 2500);
  }
}

function moneyMask (value) {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value)
  )

  return 'R$ ' + result
}