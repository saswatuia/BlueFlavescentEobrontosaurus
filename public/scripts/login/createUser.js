function createCredentialString(username, password){
    const combinedStr = `${username}":"${password}`;
    const b64Str = btoa(combinedStr);

    return `basic ${b64Str}`;
}
