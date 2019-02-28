import isMobile from 'is-mobile'

document.addEventListener('DOMContentLoaded', () => {
    type info = {
        img: string
        title: string
        description: string
        msg: string
    }

    const mobile = isMobile.isMobile()
    console.log('is mobile', mobile)

    function getLongUrl(info: info) {
        return `${location.href}${encodeURIComponent(info.img)}/${encodeURIComponent(info.title)}/${encodeURIComponent(info.description)}/${encodeURIComponent(info.msg)}/`
    }

    async function getShortUrl(info: info): Promise<string> {
        const res = await fetch(`https://avp.io/api/v2/action/shorten?key=ae34615cd0157f29c42263d132e7ef&url=${encodeURIComponent(getLongUrl(info))}`)
        return await res.text()
    }


    (document.getElementById('generator') as HTMLFormElement).addEventListener('submit', async (e) => {
        function getVal(id: string) {
            return (document.getElementById(id) as HTMLInputElement).value
        }

        const info: info = {
            img: (document.querySelector('input[name="img"]:checked') as HTMLInputElement).value,
            title: getVal('title'),
            description: getVal('description'),
            msg: getVal('msg')
        }

        e.preventDefault();

        const out = document.getElementById('short-url') as HTMLInputElement
        out.value = 'generating link...'
        out.value = await getShortUrl(info)
        return false;
    })
})

