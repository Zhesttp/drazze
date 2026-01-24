// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dropdown menu close on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
        });
    }
});

// Observer options for scroll animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
document.querySelectorAll('.feature-card, .way-card, .security-card, .channel-card, .resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form handling (newsletter, contact)
const newsletterForm = document.querySelector('.footer-newsletter');
if (newsletterForm) {
    const form = newsletterForm.closest('form') || newsletterForm;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
            alert('Thank you for subscribing!');
            input.value = '';
        }
    });
}

// Language translations
const translations = {
    en: {
        nav: {
            products: "Products",
            about: "About",
            learn: "Learn",
            tools: "Tools"
        },
        hero: {
            title: "DRAZZE SYSTEM",
            subtitle: "NEXT-GENERATION WEB3 ECOSYSTEM ON TON",
            description: "Swap, provide liquidity, and farm TON-based tokens with lightning-fast speeds, minimal fees, and seamless Telegram integration — all while maintaining complete control of your assets.",
            join: "Join",
            buy: "Buy"
        },
        stats: {
            users: "Users",
            allWallets: "All wallets",
            allHolders: "All Holders",
            allTimeSwaps: "All-time swaps"
        },
        features: {
            title1: "Technological Base",
            desc1: "Infrastructure on the TON blockchain, ensuring speed, security, and scalability. The foundation for product operation and mass adoption.",
            title2: "Transparent Economy",
            desc2: "All processes in DRAZZE operate via smart contracts. Accruals, token distribution, and participation in the ecosystem occur according to pre-set rules, without manual control.",
            title3: "Web3 Products",
            desc3: "DRAZZE creates and develops market-demanded Web3 products with clear demand, user interest, and scaling potential.",
            title4: "Active Community",
            desc4: "A strong and engaged community shaping the future of the platform. People are involved in products, use tokens, participate in mechanics, and receive direct benefits from the ecosystem's growth."
        },
        tokenomics: {
            title: "Tokenomics DRAZZE",
            totalEmission: "Total coin emission",
            tokensLocked: "Tokens off-market are locked or in staking",
            liquidityPool: "Liquidity Reserve Pool",
            teamDev: "Team and Company Development",
            marketing: "Marketing, Traffic, Advertising",
            bonusPool: "Bonus Pool for Active Participants",
            saleCompleted: "Primary token sale completed"
        },
        facts: {
            title: "Interesting Facts",
            fact1: "Starting from January 7, 2026, the first reduction by 3%",
            fact2: "Token mining will decrease by 1% every 6 months",
            fact3: "Part of the ecosystem's profit goes to token buyback and burning",
            fact4: "Unused tokens are burned"
        },
        staking: {
            title: "DeFi Staking",
            maxYield: "Maximum yield",
            description: "Participate in DRZ token staking and receive passive income from 15% to 22% per month. Tokens will be mined gradually over 3-4 years through the DeFi staking mechanism.",
            feature1: "High yield",
            feature2: "Blockchain security",
            feature3: "Transparency of operations"
        },
        igaming: {
            title: "DRAZZE",
            subtitle: "Licensed iGaming Project at Launch Stage",
            licenseTitle: "Official License",
            licenseText: "Drazze Limited received an official license to conduct iGaming activities (casino, betting, gaming), valid in 2025-2026 and entered into the state register of the Anjouan regulator. The license can be checked directly in the official register.",
            devTitle: "Development Stage",
            devText: "The project is in an active development stage: infrastructure is ready, integration of more than 100+ top game providers is underway, and platform formation.",
            economyTitle: "Ecosystem Economy",
            economyText: "The ecosystem economy is built around the DRZ token, which is used within the iGaming model for betting, bonuses, staking, and participation in platform revenues.",
            heartTitle: "iGaming",
            heartSubtitle: "— the heart of the future economy DRAZZE",
            feature1Title: "Market estimated at over $100 billion",
            feature1Text: "And grows every year, providing huge opportunities for growth",
            feature2Title: "One of the most stable and profitable sectors",
            feature2Text: "In a market with a proven business model and constant demand",
            feature3Title: "Constant circulation of funds and high liquidity",
            feature3Text: "Ensures stability and rapid growth of the ecosystem",
            feature4Title: "Stable cash flow supporting growth",
            feature4Text: "Creates a reliable foundation for long-term platform development",
            conclusion: "iGaming becomes a key financial driver of the DRAZZE ecosystem, ensuring stable revenue streams for participants",
            launchTitle: "DRAZZE Platform Launch",
            launch1: "Online casino",
            launch2: "Sports betting",
            launch3: "Card games",
            launchDate: "February-March 2026"
        },
        partners: {
            title: "Trusted by leading partners"
        },
        threeWays: {
            title: "Three ways to win with Drazze",
            description: "Whether you're swapping, building, or providing liquidity, Drazze has the tools and opportunities designed specifically for your goals.",
            liquidityLabel: "For liquidity providers",
            liquidityTitle: "Put your liquidity to work",
            liquidityDesc: "Provide liquidity to pools and receive fees on swaps.",
            liquidityBtn: "Provide liquidity >",
            addLiquidity: "Add liquidity",
            today: "Today"
        },
        roadmap: {
            title: "What the future holds",
            here: "We are here",
            future: "Our future"
        },
        security: {
            title: "Security architecture",
            subtitle: "you can trust",
            card1Title: "100% self-custodial",
            card1Text: "Your private keys never leave your wallet. Every transaction is signed by you, every asset remains under your control. Drazze can't access your funds, freeze your account, or restrict your operations — because Drazze never has custody in the first place.",
            card2Title: "Open-source & auditable",
            card2Text: "All smart contracts are publicly available on the TON blockchain. Third-party audits have been completed, and the code is continuously reviewed by the community. No hidden functions, no backdoors, no surprises.",
            card3Title: "Built-in protection mechanisms",
            card3Item1: "Smart slippage protection prevents unfavorable swaps",
            card3Item2: "Impermanent loss protection feature",
            card3Item3: "Gas estimation shows costs before confirmation"
        },
        faq: {
            title1: "Got Questions?",
            title2: "We've Got Answers"
        }
    },
    ru: {
        nav: {
            products: "Продукты",
            about: "О проекте",
            learn: "Обучение",
            tools: "Инструменты"
        },
        hero: {
            title: "СИСТЕМА DRAZZE",
            subtitle: "ЭКОСИСТЕМА WEB3 СЛЕДУЮЩЕГО ПОКОЛЕНИЯ НА TON",
            description: "Обменивайтесь, предоставляйте ликвидность и фармите токены на базе TON с молниеносной скоростью, минимальными комиссиями и бесшовной интеграцией с Telegram — при этом сохраняя полный контроль над своими активами.",
            join: "Присоединиться",
            buy: "Купить"
        },
        stats: {
            users: "Пользователи",
            allWallets: "Все кошельки",
            allHolders: "Все держатели",
            allTimeSwaps: "Всего обменов"
        },
        features: {
            title1: "Технологическая база",
            desc1: "Инфраструктура на блокчейне TON, обеспечивающая скорость, безопасность и масштабируемость. Основа для работы продуктов и массового использования.",
            title2: "Прозрачная экономика",
            desc2: "Все процессы в DRAZZE работают через смарт-контракты. Начисления, распределение токенов и участие в экосистеме происходят по заранее заданным правилам, без ручного управления.",
            title3: "Web3 Продукты",
            desc3: "DRAZZE создает и развивает востребованные рынком Web3 продукты с понятным спросом, интересом пользователей и потенциалом масштабирования.",
            title4: "Активное сообщество",
            desc4: "Сильное и вовлеченное сообщество, формирующее будущее платформы. Люди вовлечены в продукты, используют токен, участвуют в механиках и получают прямую выгоду от роста экосистемы."
        },
        tokenomics: {
            title: "Токеномика DRAZZE",
            totalEmission: "Общая эмиссия монет",
            tokensLocked: "Токенов вне рынка заблокированы или в стейкинге",
            liquidityPool: "Резервный пул ликвидности",
            teamDev: "Команда и развитие компании",
            marketing: "Маркетинг, трафик, реклама",
            bonusPool: "Бонусный пул активных участников",
            saleCompleted: "Первичная продажа токенов завершена"
        },
        facts: {
            title: "Интересные факты",
            fact1: "Начиная с 7 января 2026 года первое понижение на 3%",
            fact2: "Добыча токена будет снижаться каждые 6 месяцев на 1%",
            fact3: "Часть прибыли экосистемы идёт на выкуп и сжигание токенов",
            fact4: "Неиспользованные токены сжигаются"
        },
        staking: {
            title: "DeFi Стейкинг",
            maxYield: "Максимальная доходность",
            description: "Участвуйте в стейкинге токенов DRZ и получайте пассивный доход от 15% до 22% в месяц. Токены будут добываться постепенно в течение 3-4 лет через механизм DeFi стейкинга.",
            feature1: "Высокая доходность",
            feature2: "Безопасность блокчейна",
            feature3: "Прозрачность операций"
        },
        igaming: {
            title: "DRAZZE",
            subtitle: "Лицензированный iGaming-проект на этапе запуска",
            licenseTitle: "Официальная лицензия",
            licenseText: "Компания Drazze Limited получила официальную лицензию на ведение iGaming-деятельности (casino, betting, gaming), действующую в 2025-2026 годах и внесённую в государственный реестр регулятора Анжуана. Лицензию можно проверить напрямую в официальном реестре.",
            devTitle: "Стадия разработки",
            devText: "Проект находится в стадии активной разработки: инфраструктура готова, идёт интеграция более 100+ топовых игровых провайдеров и формирование платформы.",
            economyTitle: "Экономика экосистемы",
            economyText: "Экономика экосистемы строится вокруг токена DRZ, который используется внутри iGaming-модели для ставок, бонусов, стейкинга и участия в доходах платформы.",
            heartTitle: "iGaming",
            heartSubtitle: "— сердце будущей экономики DRAZZE",
            feature1Title: "Рынок оценивается более чем в $100 миллиардов",
            feature1Text: "И растет с каждым годом, предоставляя огромные возможности для роста",
            feature2Title: "Один из самых стабильных и прибыльных секторов",
            feature2Text: "На рынке с проверенной бизнес-моделью и постоянным спросом",
            feature3Title: "Постоянный оборот средств и высокая ликвидность",
            feature3Text: "Обеспечивает стабильность и быстрый рост экосистемы",
            feature4Title: "Стабильный кэшфлоу, поддерживающий рост",
            feature4Text: "Создает надежную основу для долгосрочного развития платформы",
            conclusion: "iGaming становится ключевым финансовым движком экосистемы DRAZZE, обеспечивая стабильные потоки дохода для участников",
            launchTitle: "Запуск платформы DRAZZE",
            launch1: "Онлайн казино",
            launch2: "Ставки на спорт",
            launch3: "Карточные игры",
            launchDate: "Февраль-Март 2026"
        },
        partners: {
            title: "Нам доверяют ведущие партнеры"
        },
        threeWays: {
            title: "Три способа выиграть с Drazze",
            description: "Независимо от того, обмениваете ли вы токены, строите или предоставляете ликвидность, Drazze предлагает инструменты и возможности, разработанные специально для ваших целей.",
            liquidityLabel: "Для поставщиков ликвидности",
            liquidityTitle: "Заставьте вашу ликвидность работать",
            liquidityDesc: "Предоставляйте ликвидность пулам и получайте комиссии с обменов.",
            liquidityBtn: "Предоставить ликвидность >",
            addLiquidity: "Добавить ликвидность",
            today: "Сегодня"
        },
        roadmap: {
            title: "Что ждет в будущем",
            here: "Мы здесь",
            future: "Наше будущее"
        },
        security: {
            title: "Архитектура безопасности",
            subtitle: "которой можно доверять",
            card1Title: "100% самокастодиальный",
            card1Text: "Ваши приватные ключи никогда не покидают ваш кошелек. Каждая транзакция подписывается вами, каждый актив остается под вашим контролем. Drazze не может получить доступ к вашим средствам, заморозить ваш аккаунт или ограничить ваши операции — потому что Drazze никогда не имеет кастодию.",
            card2Title: "Открытый исходный код и аудируемый",
            card2Text: "Все смарт-контракты публично доступны в блокчейне TON. Проведены сторонние аудиты, и код постоянно проверяется сообществом. Никаких скрытых функций, бэкдоров или сюрпризов.",
            card3Title: "Встроенные механизмы защиты",
            card3Item1: "Защита от проскальзывания предотвращает неблагоприятные обмены",
            card3Item2: "Функция защиты от непостоянных потерь",
            card3Item3: "Оценка газа показывает стоимость до подтверждения"
        },
        faq: {
            title1: "Есть вопросы?",
            title2: "У нас есть ответы"
        }
    }
};

// Language switcher
function initLanguageSwitcher() {
    const languageSelector = document.getElementById('languageSelector');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageCurrent = document.querySelector('.language-current');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (!languageSelector || !languageDropdown) return;
    
    // Get saved language or default to Russian
    let currentLang = localStorage.getItem('language') || 'ru';
    
    // Toggle dropdown
    languageSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageSelector.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedLang = option.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('language', currentLang);
                switchLanguage(currentLang);
                languageDropdown.classList.remove('active');
            }
        });
    });
    
    // Apply saved language on load (always apply, default is Russian)
    switchLanguage(currentLang);
}

// Switch language function
function switchLanguage(lang) {
    const langData = translations[lang];
    if (!langData) return;
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 4) {
        navLinks[0].textContent = langData.nav.products;
        navLinks[1].textContent = langData.nav.about;
        navLinks[2].textContent = langData.nav.learn;
        navLinks[3].textContent = langData.nav.tools;
    }
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title .title-line:first-child');
    const heroSubtitle = document.querySelector('.hero-title .subtitle');
    const heroDesc = document.querySelector('.hero-description');
    const joinBtn = document.querySelector('.btn-join');
    const buyBtn = document.querySelector('.btn-buy');
    
    if (heroTitle) heroTitle.textContent = langData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = langData.hero.subtitle;
    if (heroDesc) heroDesc.textContent = langData.hero.description;
    if (joinBtn) joinBtn.textContent = langData.hero.join;
    if (buyBtn) buyBtn.textContent = langData.hero.buy;
    
    // Update stats labels
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 4) {
        statLabels[0].textContent = langData.stats.users;
        statLabels[1].textContent = langData.stats.allWallets;
        statLabels[2].textContent = langData.stats.allHolders;
        statLabels[3].textContent = langData.stats.allTimeSwaps;
    }
    
    // Update feature cards
    const featureTitles = document.querySelectorAll('.feature-title');
    const featureDescs = document.querySelectorAll('.feature-description');
    if (featureTitles.length >= 4 && featureDescs.length >= 4) {
        featureTitles[0].textContent = langData.features.title1;
        featureDescs[0].textContent = langData.features.desc1;
        featureTitles[1].textContent = langData.features.title2;
        featureDescs[1].textContent = langData.features.desc2;
        featureTitles[2].textContent = langData.features.title3;
        featureDescs[2].textContent = langData.features.desc3;
        featureTitles[3].textContent = langData.features.title4;
        featureDescs[3].textContent = langData.features.desc4;
    }
    
    // Update tokenomics section
    const tokenomicsTitle = document.querySelector('.defi-hub-title .title-line-1');
    if (tokenomicsTitle) tokenomicsTitle.textContent = langData.tokenomics.title;
    
    const tokenomicsLabels = document.querySelectorAll('.tokenomics-label');
    if (tokenomicsLabels.length >= 6) {
        tokenomicsLabels[0].textContent = langData.tokenomics.totalEmission;
        tokenomicsLabels[1].textContent = langData.tokenomics.tokensLocked;
        tokenomicsLabels[2].textContent = langData.tokenomics.liquidityPool;
        tokenomicsLabels[3].textContent = langData.tokenomics.teamDev;
        tokenomicsLabels[4].textContent = langData.tokenomics.marketing;
        tokenomicsLabels[5].textContent = langData.tokenomics.bonusPool;
    }
    
    const tokenomicsNote = document.querySelector('.tokenomics-note p');
    if (tokenomicsNote) tokenomicsNote.textContent = langData.tokenomics.saleCompleted;
    
    // Update interesting facts
    const factsTitle = document.querySelector('.interesting-facts-title');
    if (factsTitle) factsTitle.textContent = langData.facts.title;
    
    const factTexts = document.querySelectorAll('.fact-text');
    if (factTexts.length >= 4) {
        factTexts[0].textContent = langData.facts.fact1;
        factTexts[1].textContent = langData.facts.fact2;
        factTexts[2].textContent = langData.facts.fact3;
        factTexts[3].textContent = langData.facts.fact4;
    }
    
    // Update staking section
    const stakingTitle = document.querySelector('.staking-title');
    const stakingYieldLabel = document.querySelector('.staking-yield-label');
    const stakingDesc = document.querySelector('.staking-description');
    const stakingFeatures = document.querySelectorAll('.staking-feature span');
    
    if (stakingTitle) stakingTitle.textContent = langData.staking.title;
    if (stakingYieldLabel) stakingYieldLabel.textContent = langData.staking.maxYield;
    if (stakingDesc) stakingDesc.textContent = langData.staking.description;
    if (stakingFeatures.length >= 3) {
        stakingFeatures[0].textContent = langData.staking.feature1;
        stakingFeatures[1].textContent = langData.staking.feature2;
        stakingFeatures[2].textContent = langData.staking.feature3;
    }
    
    // Update iGaming section
    const igamingTitleMain = document.querySelector('.igaming-title-main');
    const igamingTitleSub = document.querySelector('.igaming-title-sub');
    const igamingInfoTitles = document.querySelectorAll('.igaming-info-title');
    const igamingInfoTexts = document.querySelectorAll('.igaming-info-text');
    const heartTitleAccent = document.querySelector('.heart-title-accent');
    const heartTitleMain = document.querySelector('.heart-title-main');
    const igamingFeatureTitles = document.querySelectorAll('.igaming-feature-title');
    const igamingFeatureTexts = document.querySelectorAll('.igaming-feature-text');
    const igamingConclusion = document.querySelector('.igaming-conclusion p');
    const igamingLaunchTitle = document.querySelector('.igaming-launch-title');
    const igamingLaunchFeatures = document.querySelectorAll('.igaming-launch-features span');
    const igamingLaunchDate = document.querySelector('.igaming-launch-date');
    
    if (igamingTitleMain) igamingTitleMain.textContent = langData.igaming.title;
    if (igamingTitleSub) igamingTitleSub.textContent = langData.igaming.subtitle;
    if (igamingInfoTitles.length >= 3 && igamingInfoTexts.length >= 3) {
        igamingInfoTitles[0].textContent = langData.igaming.licenseTitle;
        igamingInfoTexts[0].textContent = langData.igaming.licenseText;
        igamingInfoTitles[1].textContent = langData.igaming.devTitle;
        igamingInfoTexts[1].textContent = langData.igaming.devText;
        igamingInfoTitles[2].textContent = langData.igaming.economyTitle;
        igamingInfoTexts[2].textContent = langData.igaming.economyText;
    }
    if (heartTitleAccent) heartTitleAccent.textContent = langData.igaming.heartTitle;
    if (heartTitleMain) heartTitleMain.textContent = langData.igaming.heartSubtitle;
    if (igamingFeatureTitles.length >= 4 && igamingFeatureTexts.length >= 4) {
        igamingFeatureTitles[0].textContent = langData.igaming.feature1Title;
        igamingFeatureTexts[0].textContent = langData.igaming.feature1Text;
        igamingFeatureTitles[1].textContent = langData.igaming.feature2Title;
        igamingFeatureTexts[1].textContent = langData.igaming.feature2Text;
        igamingFeatureTitles[2].textContent = langData.igaming.feature3Title;
        igamingFeatureTexts[2].textContent = langData.igaming.feature3Text;
        igamingFeatureTitles[3].textContent = langData.igaming.feature4Title;
        igamingFeatureTexts[3].textContent = langData.igaming.feature4Text;
    }
    if (igamingConclusion) igamingConclusion.textContent = langData.igaming.conclusion;
    if (igamingLaunchTitle) igamingLaunchTitle.textContent = langData.igaming.launchTitle;
    if (igamingLaunchFeatures.length >= 3) {
        igamingLaunchFeatures[0].textContent = langData.igaming.launch1;
        igamingLaunchFeatures[1].textContent = langData.igaming.launch2;
        igamingLaunchFeatures[2].textContent = langData.igaming.launch3;
    }
    if (igamingLaunchDate) igamingLaunchDate.textContent = langData.igaming.launchDate;
    
    // Update partners section
    const partnersTitle = document.querySelector('.partners-title');
    if (partnersTitle) partnersTitle.textContent = langData.partners.title;
    
    // Update three ways section
    const threeWaysTitle = document.querySelector('.three-ways-title');
    const threeWaysDesc = document.querySelector('.three-ways-description');
    const wayLabel = document.querySelector('.way-label');
    const wayCardTitle = document.querySelector('.way-card-title');
    const wayCardDesc = document.querySelector('.way-card-description');
    const wayButton = document.querySelector('.way-button');
    const addLiquidityBtn = document.querySelector('.add-liquidity-btn');
    const changeAmount = document.querySelector('.change-amount');
    
    if (threeWaysTitle) threeWaysTitle.textContent = langData.threeWays.title;
    if (threeWaysDesc) threeWaysDesc.textContent = langData.threeWays.description;
    if (wayLabel) wayLabel.textContent = langData.threeWays.liquidityLabel;
    if (wayCardTitle) wayCardTitle.textContent = langData.threeWays.liquidityTitle;
    if (wayCardDesc) wayCardDesc.textContent = langData.threeWays.liquidityDesc;
    if (wayButton) wayButton.textContent = langData.threeWays.liquidityBtn;
    if (addLiquidityBtn) addLiquidityBtn.textContent = langData.threeWays.addLiquidity;
    if (changeAmount && changeAmount.textContent.includes('Today')) {
        changeAmount.textContent = changeAmount.textContent.replace('Today', langData.threeWays.today);
    }
    
    // Update roadmap section
    const roadmapTitle = document.querySelector('.roadmap-title');
    const timelineLeft = document.querySelector('.timeline-label-left');
    const timelineRight = document.querySelector('.timeline-label-right');
    
    if (roadmapTitle) roadmapTitle.textContent = langData.roadmap.title;
    if (timelineLeft) timelineLeft.textContent = langData.roadmap.here;
    if (timelineRight) timelineRight.textContent = langData.roadmap.future;
    
    // Update security section
    const securityTitle = document.querySelectorAll('.security-title .title-line');
    const securityCardTitles = document.querySelectorAll('.security-card-title');
    const securityCardTexts = document.querySelectorAll('.security-card-text');
    const securityListItems = document.querySelectorAll('.security-list li');
    
    if (securityTitle.length >= 2) {
        securityTitle[0].textContent = langData.security.title;
        securityTitle[1].textContent = langData.security.subtitle;
    }
    if (securityCardTitles.length >= 3 && securityCardTexts.length >= 2) {
        securityCardTitles[0].textContent = langData.security.card1Title;
        securityCardTexts[0].textContent = langData.security.card1Text;
        securityCardTitles[1].textContent = langData.security.card2Title;
        securityCardTexts[1].textContent = langData.security.card2Text;
        securityCardTitles[2].textContent = langData.security.card3Title;
    }
    if (securityListItems.length >= 3) {
        securityListItems[0].textContent = langData.security.card3Item1;
        securityListItems[1].textContent = langData.security.card3Item2;
        securityListItems[2].textContent = langData.security.card3Item3;
    }
    
    // Update FAQ section
    const faqTitleLines = document.querySelectorAll('.faq-title-line');
    if (faqTitleLines.length >= 2) {
        faqTitleLines[0].textContent = langData.faq.title1;
        faqTitleLines[1].textContent = langData.faq.title2;
    }
    
    // Update language selector text
    const languageCurrent = document.querySelector('.language-current');
    if (languageCurrent) {
        languageCurrent.textContent = lang === 'en' ? 'Eng' : 'Рус';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language switcher
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}

// Button click handlers
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll animation for way cards
const wayCards = document.querySelectorAll('.way-card-left, .way-card-right');
const wayCardsObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const wayCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 200);
            wayCardsObserver.unobserve(entry.target);
        }
    });
}, wayCardsObserverOptions);

wayCards.forEach(card => {
    wayCardsObserver.observe(card);
});

// Roadmap Slider
function initRoadmapSlider() {
    const roadmapSlider = document.getElementById('roadmapSlider');
    const roadmapPrev = document.getElementById('roadmapPrev');
    const roadmapNext = document.getElementById('roadmapNext');
    const roadmapIndicators = document.getElementById('roadmapIndicators');
    const roadmapSlides = document.querySelectorAll('.roadmap-slide');

    if (!roadmapSlider || !roadmapPrev || !roadmapNext || roadmapSlides.length === 0) {
        console.log('Roadmap slider elements not found');
        return;
    }

    let currentIndex = 0;
    let slidesToShow = 4;

    function getSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 4;
    }

    function updateSlider() {
        slidesToShow = getSlidesToShow();
        
        if (roadmapSlides.length === 0) return;
        
        // Get actual slide width including gap
        const firstSlide = roadmapSlides[0];
        if (!firstSlide) return;
        
        const slideWidth = firstSlide.offsetWidth;
        const gap = 32; // 2rem = 32px
        const slideStep = slideWidth + gap;
        
        // Calculate max index
        const maxIndex = Math.max(0, roadmapSlides.length - slidesToShow);
        
        // Clamp current index
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        // Calculate translate
        const translateX = -currentIndex * slideStep;
        roadmapSlider.style.transform = `translateX(${translateX}px)`;
        
        console.log('Slider update:', {
            currentIndex,
            maxIndex,
            slidesToShow,
            translateX,
            slideWidth
        });
        
        // Update progress bar
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            const progress = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;
            timelineLine.style.setProperty('--progress', `${Math.min(progress, 100)}%`);
        }
        
        // Update arrow states
        roadmapPrev.classList.toggle('disabled', currentIndex === 0);
        roadmapNext.classList.toggle('disabled', currentIndex >= maxIndex);
        
        // Update indicators
        if (roadmapIndicators) {
            const indicators = roadmapIndicators.querySelectorAll('.roadmap-indicator');
            const currentPage = Math.floor(currentIndex / slidesToShow);
            indicators.forEach((ind, idx) => {
                ind.classList.toggle('active', idx === currentPage);
            });
        }
    }

    function nextSlide() {
        slidesToShow = getSlidesToShow();
        const maxIndex = Math.max(0, roadmapSlides.length - slidesToShow);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    function goToPage(pageIndex) {
        slidesToShow = getSlidesToShow();
        currentIndex = pageIndex * slidesToShow;
        updateSlider();
    }

    // Create indicators
    function createIndicators() {
        if (!roadmapIndicators) return;
        
        roadmapIndicators.innerHTML = '';
        slidesToShow = getSlidesToShow();
        const totalPages = Math.ceil(roadmapSlides.length / slidesToShow);
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'roadmap-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToPage(i));
            roadmapIndicators.appendChild(indicator);
        }
    }

    // Event listeners
    roadmapNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next clicked');
        nextSlide();
    });

    roadmapPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Prev clicked');
        prevSlide();
    });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesToShow = getSlidesToShow();
            if (newSlidesToShow !== slidesToShow) {
                slidesToShow = newSlidesToShow;
                currentIndex = 0;
                createIndicators();
            }
            updateSlider();
        }, 250);
    });

    // Initialize
    createIndicators();
    
    // Wait for layout to calculate
    setTimeout(() => {
        updateSlider();
    }, 100);
    
    // Also update after full load
    window.addEventListener('load', () => {
        setTimeout(updateSlider, 200);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoadmapSlider);
} else {
    initRoadmapSlider();
}

// Security Cards Auto Slider
function initSecuritySlider() {
    const securitySlider = document.getElementById('securityCardsSlider');
    const securityCards = document.querySelectorAll('.security-card');
    
    if (!securitySlider || securityCards.length === 0) {
        return;
    }
    
    // Only use first 3 cards (original ones)
    const originalCards = Array.from(securityCards).slice(0, 3);
    let currentCardIndex = 0;
    let isTransitioning = false;
    let intervalId = null;
    const SHOW_MS = 2200; // time card stays fully visible
    const TRANSITION_MS = 900; // CSS slide duration
    
    // Hide all cards initially
    originalCards.forEach((card) => {
        card.classList.remove('active', 'leaving', 'entering');
    });
    
    const setOnlyActive = (idx) => {
        originalCards.forEach((c, i) => {
            c.classList.toggle('active', i === idx);
            c.classList.remove('leaving', 'entering');
        });
    };

    const runTransitionTo = (nextIndex) => {
        if (isTransitioning) return;
        const current = originalCards[currentCardIndex];
        const next = originalCards[nextIndex];
        if (!next) return;

        isTransitioning = true;

        // Prepare next below the viewport
        next.classList.remove('leaving', 'active');
        next.classList.add('entering');
        next.style.setProperty('--enter-from', '70px');

        // Ensure current is active and not "entering"
        if (current) {
            current.classList.remove('entering');
            current.classList.add('active');
        }

        // Trigger animation next frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Slide current up and fade
                if (current) {
                    current.classList.add('leaving');
                }
                // Slide next to center and fade in
                next.classList.add('active');
                next.classList.remove('entering');

                // Cleanup after transition
                setTimeout(() => {
                    if (current) {
                        current.classList.remove('active', 'leaving', 'entering');
                    }
                    next.classList.remove('leaving', 'entering');
                    currentCardIndex = nextIndex;
                    isTransitioning = false;
                }, TRANSITION_MS);
            });
        });
    };

    const tick = () => {
        const nextIndex = (currentCardIndex + 1) % originalCards.length;
        runTransitionTo(nextIndex);
    };
    
    // Initialize - show first card
    setTimeout(() => {
        setOnlyActive(0);
        // Start loop
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(tick, SHOW_MS + TRANSITION_MS);
    }, 200);
}

// Initialize security slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecuritySlider);
} else {
    initSecuritySlider();
}

// FAQ Categories
function initFAQCategories() {
    const faqCategories = document.querySelectorAll('.faq-category-item');
    
    faqCategories.forEach(category => {
        const header = category.querySelector('.faq-category-header');
        
        if (header) {
            header.addEventListener('click', () => {
                // Remove active from all categories
                faqCategories.forEach(cat => {
                    cat.classList.remove('active');
                });
                
                // Add active to clicked category
                category.classList.add('active');
            });
        }
    });
}

// Initialize FAQ categories when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQCategories);
} else {
    initFAQCategories();
}

// Stats Counter Animation
function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    
    // Easing function for smooth animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(easedProgress * (end - start) + start);
        
        // Format number with commas
        const formatted = current.toLocaleString('en-US');
        element.textContent = prefix + formatted + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Ensure final value is set
            const finalFormatted = end.toLocaleString('en-US');
            element.textContent = prefix + finalFormatted + suffix;
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize stats animation on page load
function initStatsAnimation() {
    const statValues = document.querySelectorAll('.stat-value[data-value]');
    
    if (statValues.length === 0) {
        console.log('No stat values found');
        return;
    }
    
    statValues.forEach((statValue, index) => {
        const targetValue = parseInt(statValue.getAttribute('data-value'), 10);
        const prefix = statValue.getAttribute('data-prefix') || '';
        const suffix = statValue.getAttribute('data-suffix') || '';
        
        if (isNaN(targetValue)) {
            console.log('Invalid target value for stat:', statValue);
            return;
        }
        
        // Start animation with slight delay for each stat (faster animation - 1200ms)
        setTimeout(() => {
            animateValue(statValue, 0, targetValue, 1200, prefix, suffix);
        }, index * 100);
    });
}

// Run animation when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsAnimation);
} else {
    // DOM already loaded, run immediately
    setTimeout(initStatsAnimation, 100);
}

// Staking Yield Animation
function animateStakingYield() {
    const yieldValue = document.querySelector('.staking-yield-value');
    const progressFill = document.querySelector('.staking-progress-fill');
    
    if (!yieldValue || !progressFill) return;
    
    const startValue = parseInt(yieldValue.getAttribute('data-start'), 10);
    const endValue = parseInt(yieldValue.getAttribute('data-end'), 10);
    const duration = 2000;
    let startTimestamp = null;
    
    const animate = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
        yieldValue.textContent = currentValue + '%';
        
        // Animate progress bar
        const progressPercent = ((currentValue - startValue) / (endValue - startValue)) * 100;
        progressFill.style.width = progressPercent + '%';
        
        if (progress < 1) {
            window.requestAnimationFrame(animate);
        } else {
            yieldValue.textContent = endValue + '%';
            progressFill.style.width = '100%';
        }
    };
    
    // Use Intersection Observer to trigger animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.requestAnimationFrame(animate);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const stakingSection = document.querySelector('.staking-section');
    if (stakingSection) {
        observer.observe(stakingSection);
    }
}

// Initialize staking yield animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStakingYield);
} else {
    setTimeout(animateStakingYield, 100);
}

// Console message
console.log('%cDrazze', 'font-size: 20px; font-weight: bold; color: #0088cc;');
console.log('%cNative TON DeFi made simple', 'color: #666;');

