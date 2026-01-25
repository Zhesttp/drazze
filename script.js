// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingNumber = document.getElementById('loadingNumber');
    
    if (!loadingScreen || !loadingNumber) return;
    
    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading');
    
    let progress = 0;
    const duration = 1500; // 1.5 seconds for faster feel
    const steps = 100;
    const stepTime = duration / steps;
    
    const updateProgress = () => {
        if (progress <= 100) {
            loadingNumber.textContent = progress;
            progress++;
            setTimeout(updateProgress, stepTime);
        } else {
            // Hide loading screen after animation completes
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.remove('loading');
                }, 500);
            }, 300);
        }
    };
    
    // Start animation
    setTimeout(updateProgress, 100);
}

// Initialize loading screen when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
    initLoadingScreen();
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// FAQ Accordion
function initFAQ() {
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
}

// Initialize FAQ when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

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
            development: "Development",
            tokenomics: "Tokenomics",
            earn: "Ways to Earn",
            pools: "Pools",
            igaming: "iGaming",
            faq: "FAQ"
        },
        hero: {
            title: "DRAZZE",
            subtitle: "NEXT-GENERATION WEB3 ECOSYSTEM ON TON",
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
            sectionTitle: "Drazze - it's about development",
            title1: "KPI Bonuses",
            desc1: "New KPI bonus system for leaders with a monthly pool of 1,050,000 DRZ. Remuneration is paid for fulfilling structural volume conditions according to your rank, with no more than 40% from the strongest branch being taken into account. Leaders can receive bonuses for all KPI levels corresponding to their status and below.",
            title2: "Built-in P2P Exchanger",
            desc2: "Operates on a smart contract, ensuring fully automated and secure 24/7 transactions. Staking accruals occur every second, and tokens can be purchased directly from other participants via a bot at market price.",
            title3: "VPN",
            desc3: "DRAZZE provides its own secure VPN as a gift after activating a contract for 42 tokens. The number of available servers for connection depends on your rank in the project. VPN allows bypassing blocks and provides stable access to internet resources.",
            title4: "Blockchain Verification",
            desc4: "The DRAZZE token has passed official TON blockchain verification, confirming a full smart contract audit and high technical reliability of the project. This is an important step, increasing trust and opening the way for listing on decentralized exchanges."
        },
        tokenomics: {
            title: "Tokenomics DRAZZE",
            totalEmission: "Total coin emission",
            tokensLocked: "Tokens off-market are locked or in staking",
            liquidityPool: "Liquidity Reserve Pool",
            teamDev: "Team and Company Development",
            marketing: "Marketing, Traffic, Advertising",
            bonusPool: "Bonus Pool for Active Participants",
            saleCompleted: "Primary token sale completed 13.11.2025"
        },
        facts: {
            title: "Deflationary Token Model",
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
            certificate: "Certificate",
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
            gamesTitle: "Game Categories",
            category1: "Casino",
            category2: "Slots",
            category3: "Live Games",
            category4: "Lotteries",
            category5: "Poker",
            category6: "Sportsbook",
            category7: "Tournaments",
            category8: "VIP System",
            launchDate: "February-March 2026"
        },
        partners: {
            title: "Trusted by leading partners"
        },
        threeWays: {
            title: "Three ways to win with Drazze",
            description: "Whether you're swapping, building, or providing liquidity, Drazze has the tools and opportunities designed specifically for your goals.",
            forWhomTitle: "FOR WHOM DRAZZE",
            forWhom1: "For investors seeking long-term stability",
            forWhom2: "For entrepreneurs ready to build and scale a business",
            forWhom3: "For leaders who want to participate in the development of a new economy",
            forWhom4: "For those who want to be part of this innovative ecosystem"
        },
        earn: {
            title: "Ways to Earn with Drazze",
            slide1Title: "Staking",
            slide1Desc: "Tokens remain in your wallet, and you receive passive income from 15% to 22% per month, approximately 0.6% per day. For example, $1,000 gives from $150 to $220 profit per month.",
            slide2Title: "Affiliate Program",
            slide2Desc: "DRAZZE allows you to earn 5% from the first line and additional rewards up to 12 levels deep. For example, with regular growth of your network — if each participant attracts just one person per week — in just three months the structure can exceed 10,000 people, creating potential for high passive income. With the growth of leadership statuses, new levels of affiliate income open up, staking profits increase, and the Commander status gives access to weekly payments from the KPI bonus pool.",
            slide3Title: "KPI Pool",
            slide3Desc: "Weekly KPI pool of 45,000 DRZ is distributed among leaders who have closed their levels. Commander status brings an average of about 450 DRZ ($650) per week. Further ranks — Captain, General, Diamond, Legend and Marshal — sequentially increase your income and depth of opportunities, while maintaining the right to all bonuses of previous statuses.",
            slide4Title: "Summary",
            slide4Desc: "In DRAZZE, your income is formed from three powerful sources: staking profits, affiliate program, and weekly leadership bonuses. This unique combination creates the opportunity for stable earnings, which can range from one to hundreds of thousands of dollars weekly. Start building your future with DRAZZE today."
        },
        security: {
            title: "IGAMING POOLS SYSTEM",
            card1Title: "POOL LOGIC",
            card1Text: "It's about a percentage of the entire net profit of the iGaming platform, not from a separate product or direction. The fewer participants in the pool, the higher each one's share. The pool percentage does not change. Only the participant's share changes.",
            card1ListTitle: "THE HIGHER THE POOL:",
            card1Item1: "The higher the share",
            card1Item2: "The fewer participants",
            card1Item3: "The deeper the level of participation in the DRAZZE economy",
            card2Title: "PARTICIPANTS OF HOLDER-POOLS:",
            card2Item1: "Receive a share in the business profit",
            card2Item2: "Become co-owners of the iGaming-direction DRAZZE",
            card2Item3: "Participate not in remuneration, but in the distribution of ecosystem income",
            card3Title: "PROFIT WITHIN THE POOL IS DISTRIBUTED EQUALLY",
            card3Pool1: "Pool 1 (up to 100 spots) → 0.02% personal share",
            card3Pool2: "Pool 2 (up to 50 spots) → 0.04% personal share",
            card3Pool3: "Pool 3 (up to 30 spots) → 0.066% personal share",
            card3Pool4: "Pool 4 (up to 20 spots) → 0.10% personal share",
            card3Pool5: "Pool 5 (up to 10 spots) → 0.20% personal share",
            card4Highlight: "10% of iGaming net profit → goes into pools",
            card4ListTitle: "IN EACH POOL:",
            card4Item1: "Limited number of spots (total 210)",
            card4Item2: "Fixed share (from 0.02% to 0.2%)",
            card4Item3: "Participants receive a percentage of the iGaming platform's net profit"
        },
        faq: {
            title: "Frequently Asked Questions",
            question1: "Is DRAZZE's activity legal?",
            answer1: "Yes. Drazze Limited has an iGaming license from the Anjouan (Union of Comoros) regulator. You can verify this information yourself in the official register.",
            question2: "What is a 'deflationary model' for a token?",
            answer2: "Every 6 months, mining decreases by 1%. Part of the profit goes to buying back and burning tokens, creating scarcity and increasing their value.",
            question3: "What protects the project from dumps and manipulation?",
            answer3: "DRZ economics is built on limited emission, deflationary model, reduced mining, buyback and burning, and real token usage. This reduces speculative pressure and shifts focus to long-term value.",
            question4: "Why was iGaming chosen?",
            answer4: "It is one of the most profitable and stable industries in the world with constant growth in turnover.",
            question5: "What are revenue pools?",
            answer5: "A mechanism for distributing part of iGaming profits among participants."
        }
    },
    ru: {
        nav: {
            development: "Развитие",
            tokenomics: "Токеномика",
            earn: "Заработок",
            pools: "Пулы",
            igaming: "iGaming",
            faq: "FAQ"
        },
        hero: {
            title: "DRAZZE",
            subtitle: "ЭКОСИСТЕМА WEB3 НОВОГО ПОКОЛЕНИЯ НА TON",
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
            sectionTitle: "Drazze - это про развитие",
            title1: "Бонусы KPI",
            desc1: "Новая KPI-система бонусов для лидеров с ежемесячным пулом в 1 050 000 DRZ. Вознаграждение выплачивается за выполнение условий по объёмам структуры в соответствии с вашим рангом, при этом учитывается не более 40% от самой сильной ветки. Лидеры могут получать бонусы за все KPI-уровни, соответствующие их статусу и ниже.",
            title2: "Встроенный P2P-обменник",
            desc2: "Работает на смарт-контракте, обеспечивая полностью автоматизированные и безопасные сделки 24/7. Стейкинг-начисления происходят ежесекундно, а токены можно приобретать напрямую у других участников через бота по рыночной цене.",
            title3: "VPN",
            desc3: "DRAZZE предоставляет собственный безопасный VPN в подарок после активации контракта на 42 токена. Количество доступных серверов для подключения зависит от вашего ранга в проекте. VPN позволяет обходить блокировки и обеспечивает стабильный доступ к интернет-ресурсам.",
            title4: "Верификация блокчейна",
            desc4: "Токен DRAZZE прошёл официальную верификацию блокчейна TON, подтверждающую полную проверку смарт-контракта и высокую техническую надёжность проекта. Это важный шаг, повышающий доверие и открывающий путь к листингу на децентрализованных биржах."
        },
        tokenomics: {
            title: "Токеномика DRAZZE",
            totalEmission: "Общая эмиссия монет",
            tokensLocked: "Токенов вне рынка заблокированы или в стейкинге",
            liquidityPool: "Резервный пул ликвидности",
            teamDev: "Команда и развитие компании",
            marketing: "Маркетинг, трафик, реклама",
            bonusPool: "Бонусный пул активных участников",
            saleCompleted: "Первичная продажа токенов завершена 13.11.2025"
        },
        facts: {
            title: "Дефляционная модель токена",
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
            subtitle: "Лицензионная iGaming платформа на этапе запуска",
            certificate: "Сертификат",
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
            gamesTitle: "Категории игр",
            category1: "Казино",
            category2: "Слоты",
            category3: "Live-игры",
            category4: "Лотереи",
            category5: "Poker",
            category6: "Sportsbook",
            category7: "Турниры",
            category8: "VIP-система",
            launchDate: "Февраль-Март 2026"
        },
        partners: {
            title: "Нам доверяют ведущие партнеры"
        },
        threeWays: {
            title: "Три способа выиграть с Drazze",
            description: "Независимо от того, обмениваете ли вы токены, строите или предоставляете ликвидность, Drazze предлагает инструменты и возможности, разработанные специально для ваших целей.",
            forWhomTitle: "ДЛЯ КОГО DRAZZE",
            forWhom1: "Для инвесторов, ищущих долгосрочную стабильность",
            forWhom2: "Для предпринимателей, готовых строить и масштабировать бизнес",
            forWhom3: "Для лидеров, которые хотят участвовать в развитии новой экономики",
            forWhom4: "Для тех, кто хочет быть частью этой инновационной экосистемы"
        },
        earn: {
            title: "Способы заработка с помощью Drazze",
            slide1Title: "Стейкинг",
            slide1Desc: "Токены остаются в вашем кошельке, а вы получаете пассивный доход от 15 до 22% в месяц, примерно 0,6% в день. Например, 1000 долларов дает от 150 до 220 долларов прибыли в месяц.",
            slide2Title: "Партнёрская программа",
            slide2Desc: "DRAZZE позволяет получать доход 5% с первой линии и дополнительное вознаграждение до 12 уровней в глубину. Например, при регулярном росте вашей сети — если каждый участник привлекает всего по одному человеку в неделю — уже через три месяца структура может превысить 10 000 человек, создавая потенциал для высокого пассивного дохода. С ростом лидерских статусов открываются новые уровни партнёрского дохода, увеличивается прибыль от стейкинга, а статус Commander даёт доступ к еженедельным выплатам из KPI-бонусного пула.",
            slide3Title: "KPI-пул",
            slide3Desc: "Еженедельный KPI-пул в размере 45 000 DRZ распределяется между лидерами, закрывшими свои уровни. Статус Commander приносит в среднем около 450 DRZ ($650) в неделю. Дальнейшие ранги — Captain, General, Diamond, Legend и Marshal — последовательно увеличивают ваш доход и глубину возможностей, сохраняя при этом право на все бонусы предыдущих статусов.",
            slide4Title: "Итог",
            slide4Desc: "В DRAZZE ваши доходы формируются из трёх мощных источников: прибыли от стейкинга, партнёрской программы и еженедельных лидерских бонусов. Эта уникальная комбинация создаёт возможность для стабильного заработка, который может составлять от одной до сотен тысяч долларов еженедельно. Начните строить своё будущее с DRAZZE уже сегодня."
        },
        security: {
            title: "СИСТЕМА IGAMING ПУЛОВ",
            card1Title: "ЛОГИКА ПУЛОВ",
            card1Text: "Речь идёт о проценте от всей чистой прибыли iGaming-платформы, а не от отдельного продукта или направления. Чем меньше участников в пуле, тем выше доля каждого. Процент пула не меняется. Меняется только доля участника.",
            card1ListTitle: "ЧЕМ ВЫШЕ ПУЛ:",
            card1Item1: "Тем выше доля",
            card1Item2: "Тем меньше участников",
            card1Item3: "Тем глубже уровень участия в экономике DRAZZE",
            card2Title: "УЧАСТНИКИ ХОЛДЕР-ПУЛОВ:",
            card2Item1: "Получают долю в прибыли бизнеса",
            card2Item2: "Становятся совладельцами iGaming-направления DRAZZE",
            card2Item3: "Участвуют не в вознаграждении, а в распределении дохода экосистемы",
            card3Title: "ПРИБЫЛЬ ВНУТРИ ПУЛА РАСПРЕДЕЛЯЕТСЯ ПОРОВНУ",
            card3Pool1: "Пул 1 (до 100 мест) → 0.02% личная доля каждого участника",
            card3Pool2: "Пул 2 (до 50 мест) → 0.04% личная доля каждого участника",
            card3Pool3: "Пул 3 (до 30 мест) → 0.066% личная доля каждого участника",
            card3Pool4: "Пул 4 (до 20 мест) → 0.10% личная доля каждого участника",
            card3Pool5: "Пул 5 (до 10 мест) → 0.20% личная доля каждого участника",
            card4Highlight: "10% чистой прибыли iGaming → направляется в пулы",
            card4ListTitle: "В КАЖДОМ ПУЛЕ:",
            card4Item1: "Ограниченное число мест (всего 210)",
            card4Item2: "Фиксированная доля (от 0.02% до 0.2%)",
            card4Item3: "Участники получают процент от чистой прибыли iGaming платформы"
        },
        faq: {
            title: "Часто задаваемые вопросы",
            question1: "Законна ли деятельность DRAZZE?",
            answer1: "Да. Компания Drazze Limited имеет iGaming-лицензию регулятора Анжуан (Union of Comoros). Информацию можно самостоятельно проверить в официальном реестре.",
            question2: "Что такое «дефляционная модель» для токена?",
            answer2: "Каждые 6 месяцев добыча уменьшается на 1%. Часть прибыли идет на выкуп и сжигание токенов, создавая дефицит и повышая их ценность.",
            question3: "Что защищает проект от дампов и манипуляций?",
            answer3: "Экономика DRZ построена на ограниченной эмиссии, дефляционной модели, снижении добычи, выкупе и сжигании и реальном использовании токена. Это снижает спекулятивное давление и смещает фокус на долгосрочную ценность.",
            question4: "Почему выбран именно iGaming?",
            answer4: "Это одна из самых прибыльных и устойчивых индустрий в мире с постоянным ростом оборотом.",
            question5: "Что такое пулы дохода?",
            answer5: "Механизм распределения части прибыли iGaming между участниками."
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
    if (navLinks.length >= 6) {
        navLinks[0].textContent = langData.nav.development;
        navLinks[1].textContent = langData.nav.tokenomics;
        navLinks[2].textContent = langData.nav.earn;
        navLinks[3].textContent = langData.nav.pools;
        navLinks[4].textContent = langData.nav.igaming;
        navLinks[5].textContent = langData.nav.faq;
    }
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title .title-line:first-child');
    const heroSubtitle = document.querySelector('.hero-title .subtitle');
    const joinBtn = document.querySelector('.btn-join');
    const buyBtn = document.querySelector('.btn-buy');
    
    if (heroTitle) heroTitle.textContent = langData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = langData.hero.subtitle;
    if (joinBtn) joinBtn.textContent = langData.hero.join;
    if (buyBtn) buyBtn.textContent = langData.hero.buy;
    
    // Update hero tags
    const heroTags = document.querySelectorAll('.hero-tag[data-eng]');
    heroTags.forEach(tag => {
        if (lang === 'en') {
            tag.textContent = tag.getAttribute('data-eng');
        } else {
            tag.textContent = tag.getAttribute('data-rus');
        }
    });
    
    // Update stats labels
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 4) {
        statLabels[0].textContent = langData.stats.users;
        statLabels[1].textContent = langData.stats.allWallets;
        statLabels[2].textContent = langData.stats.allHolders;
        statLabels[3].textContent = langData.stats.allTimeSwaps;
    }
    
    // Update features section title
    const featuresSectionTitle = document.querySelector('.features-section-title');
    if (featuresSectionTitle) {
        featuresSectionTitle.textContent = langData.features.sectionTitle;
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
    const certificateBtn = document.querySelector('.certificate-btn-text');
    const igamingInfoTitles = document.querySelectorAll('.igaming-info-title');
    const igamingInfoTexts = document.querySelectorAll('.igaming-info-text');
    const heartTitleAccent = document.querySelector('.heart-title-accent');
    const heartTitleMain = document.querySelector('.heart-title-main');
    const igamingFeatureTitles = document.querySelectorAll('.igaming-feature-title');
    const igamingFeatureTexts = document.querySelectorAll('.igaming-feature-text');
    const igamingConclusion = document.querySelector('.igaming-conclusion p');
    const igamingGamesTitle = document.querySelector('.igaming-games-title');
    const gameCategoryBtns = document.querySelectorAll('.game-category-btn');
    
    if (igamingTitleMain) igamingTitleMain.textContent = langData.igaming.title;
    if (igamingTitleSub) igamingTitleSub.textContent = langData.igaming.subtitle;
    if (certificateBtn) certificateBtn.textContent = langData.igaming.certificate;
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
    if (igamingGamesTitle) igamingGamesTitle.textContent = langData.igaming.gamesTitle;
    if (gameCategoryBtns.length >= 8) {
        gameCategoryBtns[0].textContent = langData.igaming.category1;
        gameCategoryBtns[1].textContent = langData.igaming.category2;
        gameCategoryBtns[2].textContent = langData.igaming.category3;
        gameCategoryBtns[3].textContent = langData.igaming.category4;
        gameCategoryBtns[4].textContent = langData.igaming.category5;
        gameCategoryBtns[5].textContent = langData.igaming.category6;
        gameCategoryBtns[6].textContent = langData.igaming.category7;
        gameCategoryBtns[7].textContent = langData.igaming.category8;
    }
    const igamingLaunchDate = document.querySelector('.igaming-launch-date');
    if (igamingLaunchDate) igamingLaunchDate.textContent = langData.igaming.launchDate;
    
    // Update partners section
    const partnersTitle = document.querySelector('.partners-title');
    if (partnersTitle) partnersTitle.textContent = langData.partners.title;
    
    // Update three ways section
    const threeWaysTitle = document.querySelector('.three-ways-title');
    const threeWaysDesc = document.querySelector('.three-ways-description');
    if (threeWaysTitle) threeWaysTitle.textContent = langData.threeWays.title;
    if (threeWaysDesc) threeWaysDesc.textContent = langData.threeWays.description;
    
    // Update for-whom section
    const forWhomTitle = document.querySelector('.for-whom-title');
    const forWhomItems = document.querySelectorAll('.for-whom-item');
    if (forWhomTitle) forWhomTitle.textContent = langData.threeWays.forWhomTitle;
    if (forWhomItems.length >= 4) {
        forWhomItems[0].textContent = langData.threeWays.forWhom1;
        forWhomItems[1].textContent = langData.threeWays.forWhom2;
        forWhomItems[2].textContent = langData.threeWays.forWhom3;
        forWhomItems[3].textContent = langData.threeWays.forWhom4;
    }
    
    // Update earn section
    const earnSectionTitle = document.querySelector('.earn-section-title');
    if (earnSectionTitle) earnSectionTitle.textContent = langData.earn.title;
    
    const earnSlideTitles = document.querySelectorAll('.earn-slide-title');
    const earnSlideDescriptions = document.querySelectorAll('.earn-slide-description');
    
    if (earnSlideTitles.length >= 4 && earnSlideDescriptions.length >= 4) {
        earnSlideTitles[0].textContent = langData.earn.slide1Title;
        earnSlideDescriptions[0].textContent = langData.earn.slide1Desc;
        earnSlideTitles[1].textContent = langData.earn.slide2Title;
        earnSlideDescriptions[1].textContent = langData.earn.slide2Desc;
        earnSlideTitles[2].textContent = langData.earn.slide3Title;
        earnSlideDescriptions[2].textContent = langData.earn.slide3Desc;
        earnSlideTitles[3].textContent = langData.earn.slide4Title;
        earnSlideDescriptions[3].textContent = langData.earn.slide4Desc;
    }
    
    // Update security section
    const securityTitle = document.querySelectorAll('.security-title .title-line');
    if (securityTitle.length >= 1) {
        securityTitle[0].textContent = langData.security.title;
    }
    
    // Card 1
    const card1Title = document.querySelectorAll('.security-card-title')[0];
    const card1Text = document.querySelectorAll('.security-card-text')[0];
    const card1ListTitle = document.querySelector('.security-list-title');
    const card1ListItems = document.querySelectorAll('.security-list-section .security-list li');
    
    if (card1Title) card1Title.textContent = langData.security.card1Title;
    if (card1Text) card1Text.textContent = langData.security.card1Text;
    if (card1ListTitle) card1ListTitle.textContent = langData.security.card1ListTitle;
    if (card1ListItems.length >= 3) {
        card1ListItems[0].textContent = langData.security.card1Item1;
        card1ListItems[1].textContent = langData.security.card1Item2;
        card1ListItems[2].textContent = langData.security.card1Item3;
    }
    
    // Card 2
    const card2Title = document.querySelectorAll('.security-card-title')[1];
    const card2ListItems = document.querySelectorAll('.security-card:nth-child(2) .security-list li');
    
    if (card2Title) card2Title.textContent = langData.security.card2Title;
    if (card2ListItems.length >= 3) {
        card2ListItems[0].textContent = langData.security.card2Item1;
        card2ListItems[1].textContent = langData.security.card2Item2;
        card2ListItems[2].textContent = langData.security.card2Item3;
    }
    
    // Card 3
    const card3Title = document.querySelectorAll('.security-card-title')[2];
    const card3PoolItems = document.querySelectorAll('.pool-item');
    
    if (card3Title) card3Title.textContent = langData.security.card3Title;
    if (card3PoolItems.length >= 5) {
        card3PoolItems[0].textContent = langData.security.card3Pool1;
        card3PoolItems[1].textContent = langData.security.card3Pool2;
        card3PoolItems[2].textContent = langData.security.card3Pool3;
        card3PoolItems[3].textContent = langData.security.card3Pool4;
        card3PoolItems[4].textContent = langData.security.card3Pool5;
    }
    
    // Card 4
    const card4Highlight = document.querySelector('.security-highlight-box');
    const card4ListTitle = document.querySelectorAll('.security-list-title')[1];
    const card4ListItems = document.querySelectorAll('.security-card:nth-child(4) .security-list li');
    
    if (card4Highlight) card4Highlight.textContent = langData.security.card4Highlight;
    if (card4ListTitle) card4ListTitle.textContent = langData.security.card4ListTitle;
    if (card4ListItems.length >= 3) {
        card4ListItems[0].textContent = langData.security.card4Item1;
        card4ListItems[1].textContent = langData.security.card4Item2;
        card4ListItems[2].textContent = langData.security.card4Item3;
    }
    
    // Update FAQ section
    const faqTitle = document.querySelector('.faq-main-title .faq-title-line');
    if (faqTitle) faqTitle.textContent = langData.faq.title;
    
    const faqQuestions = document.querySelectorAll('.faq-question span:first-child');
    const faqAnswers = document.querySelectorAll('.faq-answer p');
    
    if (faqQuestions.length >= 5) {
        faqQuestions[0].textContent = langData.faq.question1;
        faqQuestions[1].textContent = langData.faq.question2;
        faqQuestions[2].textContent = langData.faq.question3;
        faqQuestions[3].textContent = langData.faq.question4;
        faqQuestions[4].textContent = langData.faq.question5;
    }
    
    if (faqAnswers.length >= 5) {
        faqAnswers[0].textContent = langData.faq.answer1;
        faqAnswers[1].textContent = langData.faq.answer2;
        faqAnswers[2].textContent = langData.faq.answer3;
        faqAnswers[3].textContent = langData.faq.answer4;
        faqAnswers[4].textContent = langData.faq.answer5;
    }
    
    // Update footer navigation links
    const footerNavLinks = document.querySelectorAll('.footer-nav-link[data-eng]');
    footerNavLinks.forEach(link => {
        if (lang === 'en') {
            link.textContent = link.getAttribute('data-eng');
        } else {
            link.textContent = link.getAttribute('data-rus');
        }
    });
    
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
const wayCards = document.querySelectorAll('.way-card-right, .for-whom-section');
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
    
    // Use all cards
    const originalCards = Array.from(securityCards);
    let currentCardIndex = 0;
    let isTransitioning = false;
    let intervalId = null;
    const SHOW_MS = 3000; // time card stays fully visible
    const TRANSITION_MS = 600; // CSS slide duration
    
    // Hide all cards initially
    originalCards.forEach((card) => {
        card.classList.remove('active', 'leaving', 'entering');
    });
    
    const setOnlyActive = (idx) => {
        originalCards.forEach((c, i) => {
            c.classList.toggle('active', i === idx);
            c.classList.remove('leaving', 'entering');
            if (i !== idx) {
                c.style.opacity = '0';
                c.style.visibility = 'hidden';
            }
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
        next.style.setProperty('--enter-from', '50px');

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
                        current.style.opacity = '';
                        current.style.visibility = '';
                    }
                    next.classList.remove('leaving', 'entering');
                    next.style.opacity = '';
                    next.style.visibility = '';
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

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Earn Slider
function initEarnSlider() {
    const slider = document.querySelector('.earn-slider');
    const slides = document.querySelectorAll('.earn-slide');
    const prevBtn = document.querySelector('.earn-arrow-prev');
    const nextBtn = document.querySelector('.earn-arrow-next');
    const indicators = document.querySelectorAll('.earn-indicator');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // Update arrow states
        if (prevBtn) {
            prevBtn.classList.toggle('disabled', index === 0);
        }
        if (nextBtn) {
            nextBtn.classList.toggle('disabled', index === totalSlides - 1);
        }
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            showSlide(currentSlide);
        }
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (slider.closest('.earn-section') && document.querySelector('.earn-section').getBoundingClientRect().top < window.innerHeight && document.querySelector('.earn-section').getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
    
    // Initialize
    showSlide(0);
}

// Initialize earn slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEarnSlider);
} else {
    initEarnSlider();
}

// Console message
console.log('%cDrazze', 'font-size: 20px; font-weight: bold; color: #0088cc;');
console.log('%cNative TON DeFi made simple', 'color: #666;');

