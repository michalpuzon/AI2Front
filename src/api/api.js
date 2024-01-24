import axios from 'axios'


let backendAddress = 'http://localhost:8081/'

function sendRequest(endpoint, method, body, headers) {
    headers['Content-Type'] = 'application/json'
    return axios({
        method: method.toLowerCase(),
        url: backendAddress + endpoint,
        headers: headers,
        data: body,
    })
}

function authToken() {
    let token = localStorage.getItem('token')
    if (token) {
        return `Bearer ${token}`
    }
}

//User
export function register(registerData) {
    return sendRequest('register', 'post', registerData, {})
}

export function login(loginData) {
    return sendRequest('login', 'post', loginData, {})
}

// Company
export function getCompanies() {
    return sendRequest('api/company', 'get', {}, {Authorization: authToken()})
}

export function getCompanyById(companyId) {
    return sendRequest('api/company/' + companyId, 'get', {}, {Authorization: authToken()})
}

export function createCompany(createCompany) {
    return sendRequest('api/company', 'post', createCompany, {Authorization: authToken()})
}

export function deleteCompany(companyId) {
    return sendRequest('api/company/' + companyId, 'delete', {}, {Authorization: authToken()})
}

export function updateCompany(companyId, newCompany) {
    return sendRequest('api/company/update/' + companyId, 'put', newCompany, {Authorization: authToken()})
}

// Employee
export function getCompanyEmployees(companyId) {
    return sendRequest('api/employee/company/' + companyId, 'get', {}, {Authorization: authToken()})
}

export function getAllEmployees() {
    return sendRequest('api/employee/all', 'get', {}, {Authorization: authToken()})
}

export function getEmployeeById(employeeId) {
    return sendRequest('api/employee/' + employeeId, 'get', {}, {Authorization: authToken()})
}

export function createEmployee(createEmployee) {
    return sendRequest('api/employee', 'post', createEmployee, {Authorization: authToken()})
}

export function addEmployeeToCompany(setEmployee) {
    return sendRequest('api/employee/company/add', 'patch', setEmployee, {Authorization: authToken()})
}

export function removeEmployeeFromCompany(removeEmployee) {
    return sendRequest('api/employee/company/remove', 'delete', removeEmployee, {Authorization: authToken()})
}

export function deleteEmployee(employeeId) {
    return sendRequest('api/employee/' + employeeId, 'delete', {}, {Authorization: authToken()})
}

export function setEmployeePositions(setEmployeePositionsInCompany) {
    return sendRequest('api/employee/positions', 'patch', setEmployeePositionsInCompany, {Authorization: authToken()})
}

export function updateEmployee(employeeId, newEmployee) {
    return sendRequest('api/employee/update/' + employeeId, 'put', newEmployee, {Authorization: authToken()})
}

// Position
export function getCompanyPositions(companyId) {
    return sendRequest('api/position/company/' + companyId, 'get', {}, {Authorization: authToken()})
}

export function getCompanyPositionsById(GetCompanyPositions) {
    return sendRequest('api/position', 'get', GetCompanyPositions, {Authorization: authToken()})
}

export function createPosition(createPosition) {
    return sendRequest('api/position', 'post', createPosition, {Authorization: authToken()})
}

export function deletePositionFromCompany(positionId, companyId) {
    return sendRequest('api/position/' + positionId + '/company/' + companyId, 'delete', {}, {Authorization: authToken()})
}

export function deletePositions(deletePositions) {
    return sendRequest('api/position', 'delete', deletePositions, {Authorization: authToken()})
}

export function updatePosition(positionId, newPosition) {
    return sendRequest('api/employee/update/' + positionId, 'put', newPosition, {Authorization: authToken()})
}
