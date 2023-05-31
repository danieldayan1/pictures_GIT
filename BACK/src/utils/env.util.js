export const getStringEnvByName = (envName, defaulsValue='') => {
    return process.env[envName] ?? defaulsValue;
}

export const getNumberEnvByName = (envName, defaulsValue) => {
    const value = process.env[envName];
    return value ? Number(process.env[envName]) : defaulsValue;
}
