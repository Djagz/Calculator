import data from "./data.js"
import * as Constants from './constants.js'

const display = document.querySelector('.display')
const keyPadContainer = document.querySelector('.keyPad')
const operationKeysContainer = document.querySelector('.rightPanel')
const specialKeysContainer = document.querySelector('.specialKeys')
const numberKeysContainer = document.querySelector('.numberKeys')

const mapOperationKeys = () => {
    const operationKeys = data.has('operationKeys') && data.get('operationKeys')
    operationKeys.forEach(element => {
        const operationDiv = document.createElement('div')
        const operationNode = document.createTextNode(element.label)
        operationDiv.setAttribute('class', 'key')
        operationDiv.setAttribute('id', element.action)
        operationDiv.appendChild(operationNode)
        operationKeysContainer.appendChild(operationDiv)
    });
}

const mapSpecialKeys = () => {
    const specialKeys = data.has('specialKeys') && data.get('specialKeys')
    specialKeys.forEach(element => {
        const specialKeyDiv = document.createElement('div')
        const specialKeyNode = document.createTextNode(element.label)
        const specialKeysContainerWidth = specialKeysContainer.clientWidth
        const specialKeyWidth = specialKeysContainerWidth/specialKeys.length
        specialKeyDiv.setAttribute('class', 'key')
        specialKeyDiv.setAttribute('id', element.action)
        specialKeyDiv.style.width = specialKeyWidth
        specialKeyDiv.appendChild(specialKeyNode)
        specialKeysContainer.appendChild(specialKeyDiv)
    })
}

const mapNumberKeys = () => {
    const numbers = [9,8,7,6,5,4,3,2,1,0,'.']
    numbers.forEach(element => {
        const numberKeyDiv = document.createElement('div')
        const numberKeyNode = document.createTextNode(element)
        const numberKeyWidth = '32.97%'
        numberKeyDiv.setAttribute('class', 'key')
        numberKeyDiv.style.width = numberKeyWidth
        numberKeyDiv.style.flexGrow = element !== '.' ? 1 : 0
        numberKeyDiv.appendChild(numberKeyNode)
        numberKeysContainer.appendChild(numberKeyDiv)
    })
}

let updatedDisplayInfo = String(0)

const calculateOutcome = (value) => {
    let updatedValue = null
    if(value.includes('x')){
        updatedValue = value.replace('x', '*')
    }
    return updatedValue ? eval(updatedValue) : eval(value)
}

const onKeyClick = (e) => {
    const selection = e.target.innerHTML
    const displayInfo = display.innerHTML

        switch(e.target.getAttribute('id')){
            case null:
                e.target.style.backgroundColor = 'rgb(233, 233, 233)'
                const clickEffects = setTimeout(() => {
                    e.target.style.backgroundColor = 'rgb(155, 155, 155)'
                }, 50)
                display.innerHTML = displayInfo === String(0) 
                                    ? selection 
                                    : updatedDisplayInfo[updatedDisplayInfo.length - 1] !== '.' 
                                        && isNaN(parseFloat(updatedDisplayInfo[updatedDisplayInfo.length - 1]))
                                    ? selection
                                    : displayInfo + selection
                updatedDisplayInfo = updatedDisplayInfo === String(0) ? selection : updatedDisplayInfo + selection
                break
            case Constants.CLEAR:
                display.innerHTML = String(0)
                updatedDisplayInfo = String(0)
                const allOperations = document.querySelectorAll(`#${Constants.OPERATION}`)
                allOperations.forEach(operation => {
                    operation.style.backgroundColor = 'rgb(255, 157, 28)'
                })
                break
            case Constants.TOGGLE_SIGN:
                display.innerHTML = displayInfo[0] !== '-' ? '-' + displayInfo : displayInfo.replace(displayInfo[0], '')
                break
            case Constants.OPERATION:
                e.target.style.backgroundColor = 'rgb(227, 128, 0)'
                updatedDisplayInfo = isNaN(parseFloat(displayInfo[displayInfo.length - 1])) 
                                        ? updatedDisplayInfo.replace(updatedDisplayInfo[updatedDisplayInfo.length - 1], selection)
                                        : updatedDisplayInfo + selection
                break
            case Constants.PERCENTAGE:
                display.innerHTML = updatedDisplayInfo/100
                break
            case Constants.EQUALS:
                display.innerHTML = calculateOutcome(updatedDisplayInfo)
                updatedDisplayInfo = display.innerHTML
                break
            default:
                return null
        }

}

const onLoad = () => {
    display.innerHTML = String(0)
    mapOperationKeys()
    mapSpecialKeys()
    mapNumberKeys()
}

window.addEventListener('load', onLoad)
keyPadContainer.addEventListener('click', onKeyClick)
