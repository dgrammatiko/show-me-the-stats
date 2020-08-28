const { readFile } = require('fs').promises;

module.exports = async () => {
    const dataOldText = await readFile('./src_site/final.json', { encoding: 'utf8' });
    const dataOld = await JSON.parse(dataOldText);
    const dataNewText = await readFile('./src_site/sitesData.json', { encoding: 'utf8' });
    const dataNew = await JSON.parse(dataNewText);

    const finalData = [];
    dataNew.forEach(item => {
        const newItem = item
        newItem.metrics = {
            performance: 0,
            firstContentfulPaint: 0,
            firstMeaningfulPaint: 0,
            firstCPUIdle: 0,
            interactive: 0,
            bestPractices: 0,
            accessibility: 0,
            seo: 0,
            carbon: 0

        }
        // dataOld.forEach(old => {
        //     if (newItem.href === old.href) {
        //         newItem.metrics = {
        //             performance: old.metrics.performance || 0,
        //             firstContentfulPaint: old.metrics.firstContentfulPaint || 0,
        //             firstMeaningfulPaint: old.metrics.firstMeaningfulPaint || 0,
        //             firstCPUIdle: old.metrics.firstCPUIdle || 0,
        //             interactive: old.metrics.interactive || 0,
        //             bestPractices: old.metrics.bestPractices || 0,
        //             accessibility: old.metrics.accessibility || 0,
        //             seo: old.metrics.seo || 0,
        //             carbon: old.metrics.carbon || 0
        //         }
        //     }
        // });

        finalData.push(newItem)
    })

    return finalData
}
