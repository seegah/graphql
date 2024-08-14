export const calculateAudits = (grades) => {
    let total = grades.length;
    let fail = 0;
    let pass = 0;

    for (let i = 0; i < grades.length; i++) {
        if (grades[i].grade < 1) {
            fail++;
        } else {
            pass++;
        }
    }
    return {
        total: total,
        fail: fail,
        pass: pass
    };
}
export const convertBytes = (bytes) => {
    if (bytes / 1000000 < 1) {
        return [(bytes / 1000).toFixed(0), "kB"]
    }
    return [(bytes / 1000000).toFixed(0), "MB"]
}

// Fonction pour formater les montants
export const formatSize = (size) => {
    if (size >= 1000000) {
        return `${(size / 1000000).toFixed()} MB`;
    } else if (size >= 1000) {
        return `${(size / 1000).toFixed()} kB`;
    } else {
        return `${size} B`;
    }
};

export const getUserRank = (level) => {
    if (level >= 50) {
        return "Junior developer";
    } else if (level >= 40) {
        return "Basic developer";
    } else if (level >= 30) {
        return "Assistant developer";
    } else if (level >= 20) {
        return "Apprentice developer";
    } else if (level >= 10) {
        return "Beginner developer";
    } else {
        return "Aspiring developer";
    }
}


// Fonction pour obtenir le nom du projet depuis le chemin
export const projectName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
};