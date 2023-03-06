import instagramLogo from '../../images/Footer/instagram.png';
import vkLogo from '../../images/Footer/vkontakte.png';
import fbLogo from '../../images/Footer/facebook.png';
import ttLogo from '../../images/Footer/tik-tok.png';
import telLogo from '../../images/Footer/telegram.png';
import yotLogo from '../../images/Footer/youtube.png';
import googlePlay from '../../images/Footer/google-play.png';
import appStore from '../../images/Footer/app-store.png';
import appGallery from '../../images/Footer/huawei.png';

import css from './footer.module.css';


const socialMedia = [
    {id: "1", url: "https://vk.com/ozby_books", src: vkLogo, alt: "logo"},
    {id: "2", url: "https://www.instagram.com/myozby", src: instagramLogo, alt: "logo"},
    {id: "3", url: "https://www.facebook.com/www.oz.by/wall", src: fbLogo, alt: "logo"},
    {id: "4", url: "https://t.me/myozby", src: telLogo, alt: "logo"},
    {id: "5", url: "https://www.tiktok.com/@myozby", src: ttLogo, alt: "logo"},
    {id: "6", url: "https://www.youtube.com/c/OZbychannel/featured", src: yotLogo, alt: "logo"},
]

export const Footer = () => {
    return (
        <div className={css.containerFooter}>
            <hr></hr>
            <p className={css.textNews}>Следите за акциями и новостями</p>
            <div>
                <ul className={css.blockSocial}>
                    {socialMedia.map((item) => (
                        <li key={item.id} className={css.social}>
                            <a href={item.url}>
                                <img src={item.src} alt={item.alt} className={css.socialImg}/>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <p className={css.downloadStore}>Скачайте мобильное приложение</p>
            <span className={css.blockDownloadStore}>
                <a className={css.googlePlayStore} href="https://play.google.com/store/apps/details?id=by.oz.android&referrer=utm_source%3Dmainsite%26utm_medium%3Dfooter%26utm_campaign%3D">
                    <img src={googlePlay} alt={'logo'} className={css.storeImg}/>
                    Google Play
                </a>
                <a className={css.appStore} href="https://apps.apple.com/us/app/oz/id1224520373?l=ru">
                    <img src={appStore} alt={'logo'} className={css.storeImg}/>
                    App Store
                </a>
                <a className={css.galleryStore} href="https://appgallery.huawei.com/#/app/C104293475">
                    <img src={appGallery} alt={'logo'} className={css.storeImg}/>
                    App Gallery
                </a>
            </span>
            <hr></hr>
            <p className={css.storeText}>Общество с ограниченной ответственностью «Приносим радость». Свидетельство о государственной регистрации
                выдано Минским горисполкомом от 19.04.2018 с регистрационным номером 193067319. УНП 193067319.
                Юр. адрес: 220073, г. Минск, ул. Скрыганова, д. 14, каб. 36. Время работы с понедельника по пятницу с
                9:00 до 17:30. Контакты: 695-25-25 МТС, A1, life:), oz@oz.by.
                Уполномоченный на рассмотрение обращений покупателей: генеральный директор ООО «Приносим радость»,
                запись по телефону +375 17 278-50-98.
                Уполномоченные по защите прав потребителей: отдел торговли и услуг администрации Фрунзенского района г.
                Минска, +375 17 348-39-06, +375 17 272-73-84.</p>
        </div>
    )
}
