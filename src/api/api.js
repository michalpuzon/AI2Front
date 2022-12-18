import axios from 'axios'


let backendAddress = 'http://localhost:8080/api/'

function sendRequest(endpoint, method, body, headers) {
    headers['Content-Type'] = 'application/json'
    return axios({
        method: method.toLowerCase(),
        url: backendAddress + endpoint,
        headers: headers,
        data: body,
    })
}

// Company
export function getCompanies() {
    return sendRequest('company', 'get', {}, {})
}

export function getCompanyById(companyId) {
    return sendRequest('company/' + companyId, 'get', {}, {})
}

export function createCompany(createCompany) {
    return sendRequest('company', 'post', createCompany, {})
}

export function deleteCompany(companyId) {
    return sendRequest('company/' + companyId, 'delete', {}, {})
}

export function updateCompany(companyId, newCompany) {
    return sendRequest('company/update/' + companyId, 'put', newCompany, {})
}

// Employee
export function getCompanyEmployees(companyId) {
    return sendRequest('employee/company/' + companyId, 'get', {}, {})
}

export function getEmployeeById(employeeId) {
    return sendRequest('employee/' + employeeId, 'get', {}, {})
}

export function createEmployee(createEmployee) {
    return sendRequest('employee', 'post', createEmployee, {})
}

export function addEmployeeToCompany(setEmployee) {
    return sendRequest('employee/company/add', 'patch', setEmployee, {})
}

export function removeEmployeeFromCompany(removeEmployee) {
    return sendRequest('employee/company/remove', 'delete', removeEmployee, {})
}

export function deleteEmployee(employeeId) {
    return sendRequest('employee/' + employeeId, 'delete', {}, {})
}

export function setEmployeePositions(setEmployeePositionsInCompany) {
    return sendRequest('employee/positions', 'patch', setEmployeePositionsInCompany, {})
}

export function updateEmployee(employeeId, newEmployee) {
    return sendRequest('employee/update/' + employeeId, 'put', newEmployee, {})
}

// Position
export function getCompanyPositions(companyId) {
    return sendRequest('position/company/' + companyId, 'get', {}, {})
}

export function getCompanyPositionsById(GetCompanyPositions) {
    return sendRequest('position', 'get', GetCompanyPositions, {})
}

export function createPosition(createPosition) {
    return sendRequest('position', 'post', createPosition, {})
}

export function deletePositionFromCompany(positionId, companyId) {
    return sendRequest('position/' + positionId + '/company/' + companyId, 'delete', {}, {})
}

export function deletePositions(deletePositions) {
    return sendRequest('position', 'delete', deletePositions, {})
}

export function updatePosition(positionId, newPosition) {
    return sendRequest('employee/update/' + positionId, 'put', newPosition, {})
}