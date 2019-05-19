

const StringUtil = {
    isEmpty(data) {
        return data === null || data === undefined || data === '';
    },
    getDataLimit(number, data) {
        let newData = '';
        if (!this.isEmpty(data)) {
            const dataSplit = data.split(' ');
            let length = 0;
            for (let i = 0; i < dataSplit.length; i += 1) {
                length += dataSplit[i].length;
                if (i === 0 && length > number) {
                    for (let j = 0; j < number; j += 1) {
                        newData += dataSplit[i][j];
                    }
                    newData += ' ...';
                    break;
                } else if (length < number) {
                    newData += `${dataSplit[i]} `;
                } else {
                    newData += ' ...';
                    break;
                }
            }
        }
        return newData;
    },
    jsonCheckExistKey(json, key) {
        return json.hasOwnProperty(key);
    },
    convertNaN20(number) {
        if (isNaN(number)) return 0;
        return number;
    },
    matchNumber(data) {
        const regex = /\d+/g;
        return data.match(regex);
    },
    isConvert2Json(data) {
        try {
            if (JSON.parse(data)) return true;
        } catch (error) {
            return false;
        }
        return false;
    }
};

export default StringUtil;