async function fetchWithMultipleProxies(url) {
    const proxies = [
        (target) => `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`,  // AllOrigins
        (target) => `https://corsproxy.io/?${encodeURIComponent(target)}`,              // CORS Proxy
        (target) => `https://thingproxy.freeboard.io/fetch/${target}`,                  // ThingProxy
        (target) => `https://api.codetabs.com/v1/proxy?quest=${target}`                 // CodeTabs Proxy
    ];

    for (let proxy of proxies) {
        try {
            let response = await fetch(proxy(url));
            if (!response.ok) throw new Error(`Proxy failed: ${proxy(url)}`);

            // Clone response before reading
            let responseClone = response.clone();

            try {
                let jsonData = await response.json();  // Try JSON first
                return jsonData.contents || jsonData; // If "contents" exists, return it
            } catch {
                return await responseClone.text();  // Fallback to text if JSON fails
            }

        } catch (error) {

        }
    }

    console.error("All proxies failed.");
    return null;
}

$('#dashboard').on('click', function (event) {
    event.preventDefault();
    $('#main-container-dashboard').addClass('active');
    $('#main-container-social').removeClass('active');
    $('#main-container-charts').removeClass('active');
    $('#main-container-trends').removeClass('active');
    $('#main-container-mentions').removeClass('active');
    $('#main-container-comments').removeClass('active');
    $('#main-container-reports').removeClass('active');
});

$('#chart').on('click', function (event) {
    event.preventDefault();
    $('#main-container-social').removeClass('active');
    $('#main-container-dashboard').removeClass('active');
    $('#main-container-charts').addClass('active');
    $('#main-container-trends').removeClass('active');
    $('#main-container-mentions').removeClass('active');
    $('#main-container-comments').removeClass('active');
    $('#main-container-reports').removeClass('active');
});

$('#social').on('click', function (event) {
    event.preventDefault();
    $('#main-container-social').addClass('active');
    $('#main-container-dashboard').removeClass('active');
    $('#main-container-charts').removeClass('active');
    $('#main-container-trends').removeClass('active');
    $('#main-container-mentions').removeClass('active');
    $('#main-container-comments').removeClass('active');
    $('#main-container-reports').removeClass('active');
});

$('#trend').on('click', function (event) {
    event.preventDefault();
    $('#main-container-social').removeClass('active');
    $('#main-container-dashboard').removeClass('active');
    $('#main-container-charts').removeClass('active');
    $('#main-container-trends').addClass('active');
    $('#main-container-mentions').removeClass('active');
    $('#main-container-comments').removeClass('active');
    $('#main-container-reports').removeClass('active');
});

$('#mention').on('click', function (event) {
    event.preventDefault();
    $('#main-container-social').removeClass('active');
    $('#main-container-dashboard').removeClass('active');
    $('#main-container-charts').removeClass('active');
    $('#main-container-trends').removeClass('active');
    $('#main-container-mentions').addClass('active');
    $('#main-container-comments').removeClass('active');
    $('#main-container-reports').removeClass('active');
});

$('#comment').on('click', function (event) {
    event.preventDefault();
    $('#main-container-social').removeClass('active');
    $('#main-container-dashboard').removeClass('active');
    $('#main-container-charts').removeClass('active');
    $('#main-container-trends').removeClass('active');
    $('#main-container-mentions').removeClass('active');
    $('#main-container-comments').addClass('active');
    $('#main-container-reports').removeClass('active');
});

$('#report').on('click', function (event) {
    event.preventDefault();
    $('#main-container-social').removeClass('active');
    $('#main-container-dashboard').removeClass('active');
    $('#main-container-charts').removeClass('active');
    $('#main-container-trends').removeClass('active');
    $('#main-container-mentions').removeClass('active');
    $('#main-container-comments').removeClass('active');
    $('#main-container-reports').addClass('active');
});
// Set default active container
$('#main-container-dashboard').addClass('active');

var dateCounts = {}; //Dates
var colors = [
    "cornflowerblue",
    "olivedrab",
    "orange",
    "tomato",
    "crimson",
    "purple",
    "turquoise",
    "forestgreen",
    "navy",
    "gray",
    "teal",
    "darkorchid",
    "mediumspringgreen",
    "lightcoral",
    "steelblue",
    "rosybrown",
    "indigo",
    "cadetblue",
    "sienna",
    "goldenrod",
    "maroon",
    "darkslategray",
    "lime",
    "mediumvioletred",
    "slateblue",
    "peru",
    "royalblue",
    "olive",
    "darkgoldenrod",
    "slategray",
    "saddlebrown",
    "darkorange",
    "mediumseagreen",
    "orchid",
    "mediumaquamarine",
    "darkgreen",
    "mediumslateblue",
    "darkmagenta",
    "dodgerblue",
    "firebrick",
    "mediumblue",
    "indianred",
    "navajowhite",
    "mediumorchid",
    "darkred",
    "seagreen",
    "darkcyan",
    "lightseagreen",
    "chocolate",
    "mediumturquoise",
    "crimson",
    "darkviolet",
    "darkolivegreen",
    "deepskyblue",
    "mediumspringgreen",
    "orangered",
    "purple",
    "salmon",
    "slateblue",
    "tomato",
    "darkslateblue",
    "darksalmon",
    "deepskyblue",
    "limegreen",
    "lightcoral",
    "mediumblue",
    "mediumvioletred",
    "midnightblue",
    "magenta",
    "green",
    "greenyellow",
    "hotpink",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "mediumslateblue",
    "navy",
    "palegreen",
    "orangered",
    "powderblue",
    "saddlebrown",
    "seagreen",
    "royalblue",
    "springgreen",
    "thistle",
    "violet",
    "yellowgreen",
    "darkolivegreen",
    "deeppink",
    "deepskyblue",
    "darkslategray",
    "darkseagreen",
    "darkorchid",
    "darkmagenta",
    "darkgreen",
    "darkcyan",
    "darkblue",
    "darkgoldenrod",
    "darkgray",
    "darkred",
    "darkorange",
    "darkkhaki",
    "darkviolet",
    "darksalmon",
    "darkturquoise",
    "dodgerblue",
    "lightseagreen",
    "lightgreen",
    "lightcoral",
    "lightpink",
    "lightsalmon",
    "lightsteelblue",
    "limegreen",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen"
];

// Sentiments
var sentiments_keyword_positive = [
    "good", "better", "nice", "excellent", "awesome",
    "fantastic", "wonderful", "superb", "great", "amazing",
    "brilliant", "terrific", "splendid", "fabulous", "outstanding",
    "phenomenal", "perfect", "incredible", "marvelous", "impressive",
    "delightful", "exceptional", "lovely", "beautiful", "cool",
    "joyful", "happy", "uplifting", "glorious", "graceful",
    "charming", "sensational", "stunning", "remarkable", "majestic",
    "elegant", "radiant", "breathtaking", "exquisite", "vibrant",
    "refreshing", "captivating", "blissful", "divine", "ecstatic",
    "thrilling", "ravishing", "enchanting", "resplendent", "serene",
    "exhilarating", "miraculous", "sunshine", "paradise", "heavenly",
    "glowing", "delicious", "grateful", "empowering", "fab",
    "pristine", "harmonious", "awesome", "magic", "celestial",
    "heartwarming", "gentle", "luminous", "exultant", "jubilant",
    "radiant", "cheerful", "bright", "sparkling", "festive",
    "gleaming", "sunny", "glistening", "effervescent", "exuberant",
    "golden", "beaming", "lively", "magnificent", "idyllic",
    "energizing", "bliss", "tranquil", "utopia", "paradise",
    "buoyant", "charismatic", "buoyant", "colorful", "glamorous"
];
var sentiments_keyword_count_positive = {};

var sentiments_keyword_negative = [
    "bad", "worse", "terrible", "horrible", "awful",
    "poor", "unpleasant", "disappointing", "unfavorable", "inferior",
    "disgusting", "offensive", "ugly", "abysmal", "dreadful",
    "lousy", "distasteful", "repulsive", "disheartening", "unacceptable",
    "depressing", "discouraging", "grim", "unfortunate", "miserable",
    "gloomy", "dire", "dreary", "bleak", "sad",
    "tragic", "melancholy", "grief", "sorrow", "despair",
    "anguish", "heartbreaking", "disastrous", "ruinous", "devastating",
    "catastrophic", "horrifying", "nightmarish", "frightening", "terrifying",
    "scary", "menacing", "threatening", "dangerous", "harmful"
];
var sentiments_keyword_count_negative = {};

var sentiments_keyword_Uncertainty = [
    "uncertain", "ambiguous", "doubtful", "indecisive", "insecure",
    "unsettled", "vague", "undecided", "unpredictable", "confused",
    "conflicted", "hesitant", "wary", "ambiguous", "equivocal",
    "unresolved", "unstable", "precarious", "tentative", "shaky",
    "unsteady", "iffy", "hazy", "murky", "cloudy",
    "fuzzy", "nebulous", "opaque", "mysterious", "obscure",
    "perplexing", "puzzling", "bewildering", "mixed", "variable",
    "volatile", "capricious", "chancy", "unreliable", "unclear",
    "questionable", "dubious", "skeptical", "suspicious", "anxious"
];
var sentiments_keyword_count_Uncertainty = {};

var sentiments_keyword_Litigious = [
    "litigious", "lawsuit", "legal action", "court", "litigation",
    "dispute", "lawsuit", "claim", "legal battle", "litigate",
    "lawsuit", "legal case", "legal dispute", "lawsuit", "lawsuit",
    "litigious", "lawsuit", "legal claim", "legal proceeding", "litigation",
    "lawsuit", "lawsuit", "lawsuit", "litigious", "legal matter",
    "lawsuit", "legal process", "litigate", "lawsuit", "legal fight",
    "court case", "litigious", "lawsuit", "legal issue", "litigation",
    "lawsuit", "lawsuit", "lawsuit", "litigious", "legal matter",
    "lawsuit", "legal dispute", "litigate", "lawsuit", "legal action",
    "court battle", "litigious", "lawsuit", "legal challenge", "litigation"
];
var sentiments_keyword_count_Litigious = {};

// Mapping of country names to abbreviations
var countryAbbreviations = {
    "afghanistan": "AF",
    "albania": "AL",
    "algeria": "DZ",
    "andorra": "AD",
    "angola": "AO",
    "antigua and barbuda": "AG",
    "argentina": "AR",
    "armenia": "AM",
    "australia": "AU",
    "austria": "AT",
    "azerbaijan": "AZ",
    "bahamas": "BS",
    "bahrain": "BH",
    "bangladesh": "BD",
    "barbados": "BB",
    "belarus": "BY",
    "belgium": "BE",
    "belize": "BZ",
    "benin": "BJ",
    "bhutan": "BT",
    "bolivia": "BO",
    "bosnia and herzegovina": "BA",
    "botswana": "BW",
    "brazil": "BR",
    "brunei": "BN",
    "bulgaria": "BG",
    "burkina faso": "BF",
    "burundi": "BI",
    "cabo verde": "CV",
    "cambodia": "KH",
    "cameroon": "CM",
    "canada": "CA",
    "central african republic": "CF",
    "chad": "TD",
    "chile": "CL",
    "china": "CN",
    "colombia": "CO",
    "comoros": "KM",
    "congo (democratic republic of the)": "CD",
    "congo (republic of the)": "CG",
    "costa rica": "CR",
    "croatia": "HR",
    "cuba": "CU",
    "cyprus": "CY",
    "czech republic": "CZ",
    "denmark": "DK",
    "djibouti": "DJ",
    "dominica": "DM",
    "dominican republic": "DO",
    "ecuador": "EC",
    "egypt": "EG",
    "el salvador": "SV",
    "equatorial guinea": "GQ",
    "eritrea": "ER",
    "estonia": "EE",
    "ethiopia": "ET",
    "fiji": "FJ",
    "finland": "FI",
    "france": "FR",
    "gabon": "GA",
    "gambia": "GM",
    "georgia": "GE",
    "germany": "DE",
    "ghana": "GH",
    "greece": "GR",
    "grenada": "GD",
    "guatemala": "GT",
    "guinea": "GN",
    "guinea-bissau": "GW",
    "guyana": "GY",
    "haiti": "HT",
    "honduras": "HN",
    "hungary": "HU",
    "iceland": "IS",
    "india": "IN",
    "indonesia": "ID",
    "iran": "IR",
    "iraq": "IQ",
    "ireland": "IE",
    "israel": "IL",
    "italy": "IT",
    "jamaica": "JM",
    "japan": "JP",
    "jordan": "JO",
    "kazakhstan": "KZ",
    "kenya": "KE",
    "kiribati": "KI",
    "kosovo": "XK",
    "kuwait": "KW",
    "kyrgyzstan": "KG",
    "laos": "LA",
    "latvia": "LV",
    "lebanon": "LB",
    "lesotho": "LS",
    "liberia": "LR",
    "libya": "LY",
    "liechtenstein": "LI",
    "lithuania": "LT",
    "luxembourg": "LU",
    "macedonia (north macedonia)": "MK",
    "madagascar": "MG",
    "malawi": "MW",
    "malaysia": "MY",
    "maldives": "MV",
    "mali": "ML",
    "malta": "MT",
    "marshall islands": "MH",
    "mauritania": "MR",
    "mauritius": "MU",
    "mexico": "MX",
    "micronesia": "FM",
    "moldova": "MD",
    "monaco": "MC",
    "mongolia": "MN",
    "montenegro": "ME",
    "morocco": "MA",
    "mozambique": "MZ",
    "myanmar (burma)": "MM",
    "namibia": "NA",
    "nauru": "NR",
    "nepal": "NP",
    "netherlands": "NL",
    "new zealand": "NZ",
    "nicaragua": "NI",
    "niger": "NE",
    "nigeria": "NG",
    "north korea": "KP",
    "norway": "NO",
    "oman": "OM",
    "pakistan": "PK",
    "palau": "PW",
    "palestine": "PS",
    "panama": "PA",
    "papua new guinea": "PG",
    "paraguay": "PY",
    "peru": "PE",
    "philippines": "PH",
    "poland": "PL",
    "portugal": "PT",
    "qatar": "QA",
    "romania": "RO",
    "russia": "RU",
    "rwanda": "RW",
    "saint kitts and nevis": "KN",
    "saint lucia": "LC",
    "saint vincent and the grenadines": "VC",
    "samoa": "WS",
    "san marino": "SM",
    "sao tome and principe": "ST",
    "saudi arabia": "SA",
    "senegal": "SN",
    "serbia": "RS",
    "seychelles": "SC",
    "sierra leone": "SL",
    "singapore": "SG",
    "slovakia": "SK",
    "slovenia": "SI",
    "solomon islands": "SB",
    "somalia": "SO",
    "south africa": "ZA",
    "south korea": "KR",
    "south sudan": "SS",
    "spain": "ES",
    "sri lanka": "LK",
    "sudan": "SD",
    "suriname": "SR",
    "swaziland": "SZ",
    "sweden": "SE",
    "switzerland": "CH",
    "syria": "SY",
    "taiwan": "TW",
    "tanzania": "TZ",
    "thailand": "TH",
    "timor-leste": "TL",
    "togo": "TG",
    "tonga": "TO",
    "trinidad and tobago": "TT",
    "tunisia": "TN",
    "turkey": "TR",
    "turkmenistan": "TM",
    "tuvalu": "TV",
    "uganda": "UG",
    "ukraine": "UA",
    "united arab emirates": "AE",
    "united kingdom": "GB",
    "united states": "US",
    "uruguay": "UY",
    "uzbekistan": "UZ",
    "vanuatu": "VU",
    "vatican city": "VA",
    "venezuela": "VE",
    "vietnam": "VN",
    "yemen": "YE",
    "zambia": "ZM",
    "zimbabwe": "ZW",
    "tajikistan": "TJ"
};
var Country = [
    "afghanistan",
    "albania",
    "algeria",
    "andorra",
    "angola",
    "antigua and barbuda",
    "argentina",
    "armenia",
    "australia",
    "austria",
    "azerbaijan",
    "bahamas",
    "bahrain",
    "bangladesh",
    "barbados",
    "belarus",
    "belgium",
    "belize",
    "benin",
    "bhutan",
    "bolivia",
    "bosnia and herzegovina",
    "botswana",
    "brazil",
    "brunei",
    "bulgaria",
    "burkina faso",
    "burundi",
    "cabo verde",
    "cambodia",
    "cameroon",
    "canada",
    "central african republic",
    "chad",
    "chile",
    "china",
    "colombia",
    "comoros",
    "congo (democratic republic of the)",
    "congo (republic of the)",
    "costa rica",
    "croatia",
    "cuba",
    "cyprus",
    "czech republic",
    "denmark",
    "djibouti",
    "dominica",
    "dominican republic",
    "ecuador",
    "egypt",
    "el salvador",
    "equatorial guinea",
    "eritrea",
    "estonia",
    "ethiopia",
    "fiji",
    "finland",
    "france",
    "gabon",
    "gambia",
    "georgia",
    "germany",
    "ghana",
    "greece",
    "grenada",
    "guatemala",
    "guinea",
    "guinea-bissau",
    "guyana",
    "haiti",
    "honduras",
    "hungary",
    "iceland",
    "india",
    "indonesia",
    "iran",
    "iraq",
    "ireland",
    "israel",
    "italy",
    "jamaica",
    "japan",
    "jordan",
    "kazakhstan",
    "kenya",
    "kiribati",
    "kosovo",
    "kuwait",
    "kyrgyzstan",
    "laos",
    "latvia",
    "lebanon",
    "lesotho",
    "liberia",
    "libya",
    "liechtenstein",
    "lithuania",
    "luxembourg",
    "macedonia (north macedonia)",
    "madagascar",
    "malawi",
    "malaysia",
    "maldives",
    "mali",
    "malta",
    "marshall islands",
    "mauritania",
    "mauritius",
    "mexico",
    "micronesia",
    "moldova",
    "monaco",
    "mongolia",
    "montenegro",
    "morocco",
    "mozambique",
    "myanmar (burma)",
    "namibia",
    "nauru",
    "nepal",
    "netherlands",
    "new zealand",
    "nicaragua",
    "niger",
    "nigeria",
    "north korea",
    "norway",
    "oman",
    "pakistan",
    "palau",
    "palestine",
    "panama",
    "papua new guinea",
    "paraguay",
    "peru",
    "philippines",
    "poland",
    "portugal",
    "qatar",
    "romania",
    "russia",
    "rwanda",
    "saint kitts and nevis",
    "saint lucia",
    "saint vincent and the grenadines",
    "samoa",
    "san marino",
    "sao tome and principe",
    "saudi arabia",
    "senegal",
    "serbia",
    "seychelles",
    "sierra leone",
    "singapore",
    "slovakia",
    "slovenia",
    "solomon islands",
    "somalia",
    "south africa",
    "south korea",
    "south sudan",
    "spain",
    "sri lanka",
    "sudan",
    "suriname",
    "swaziland",
    "sweden",
    "switzerland",
    "syria",
    "taiwan",
    "tajikistan",
    "tanzania",
    "thailand",
    "timor-leste",
    "togo",
    "tonga",
    "trinidad and tobago",
    "tunisia",
    "turkey",
    "turkmenistan",
    "tuvalu",
    "uganda",
    "ukraine",
    "united arab emirates",
    "united kingdom",
    "united states",
    "uruguay",
    "uzbekistan",
    "vanuatu",
    "vatican city",
    "venezuela",
    "vietnam",
    "yemen",
    "zambia",
    "zimbabwe"
];

var keywords1 = [];
var db_Country = [];
var Country_Count = {};
var db_keyword = [];
var keywordCounts1 = {};
var RSSTitleCount = [];
var RSSDescriptionCount = [];
var RSSLinks = [];
var keywordCounts2 = {}; //Domain Type
var Creators = [];
var parsedPubDates = [];

var twitter_title = [];
var twitter_description = [];
var twitter_imagesUrl = []; // Initialize the array to store image URLs
var twitter_link = [];

const rssURL = "https://rss.app/feeds/_dnMCrP1iDlZOLZYG.xml";

fetchWithMultipleProxies(rssURL)
    .then(data => {
        // Parse the XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Select each <item> element
        const items = xmlDoc.querySelectorAll('item');

        // Iterate over each <item> element
        items.forEach(item => {
            var title = item.querySelector('title').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');;
            var description = item.querySelector('description').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');;
            var mediaContent = item.querySelector('content');
            var link = item.querySelector('link').textContent;
            var pubDate = new Date(item.querySelector('pubDate').textContent);
            var dateKey = pubDate.toDateString(); // Use date as key
            var pubDateStr = new Date(pubDate);
            parsedPubDates.push({ original: pubDate, parsed: pubDateStr });

            try {
                // Extract words from title and description
                var words = title.split(/\s+/).concat(description.split(/\s+/));

                twitter_title.push(title);

                twitter_description.push(description);

                twitter_link.push(link);

                // Add the imageUrl to the array
                twitter_imagesUrl.push(mediaContent.getAttribute('url'));

                Country.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (Country_Count[keyword]) {
                            Country_Count[keyword]++;

                        } else {
                            Country_Count[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_positive.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_positive[keyword]) {
                            sentiments_keyword_count_positive[keyword]++;
                        } else {
                            sentiments_keyword_count_positive[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_negative.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_negative[keyword]) {
                            sentiments_keyword_count_negative[keyword]++;


                        } else {
                            sentiments_keyword_count_negative[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_Uncertainty.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_Uncertainty[keyword]) {
                            sentiments_keyword_count_Uncertainty[keyword]++;


                        } else {
                            sentiments_keyword_count_Uncertainty[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_Litigious.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_Litigious[keyword]) {
                            sentiments_keyword_count_Litigious[keyword]++;


                        } else {
                            sentiments_keyword_count_Litigious[keyword] = 1;
                        }
                    }
                });

                // Update keywords1 and keywordCounts1
                words.forEach(word => {
                    if (word) { // Check if the word is not empty
                        if (!keywords1.includes(word)) {
                            keywords1.push(word);
                        }
                        if (keywordCounts1[word]) {
                            keywordCounts1[word]++;
                        } else {
                            keywordCounts1[word] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                keywords1.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (keywordCounts1[keyword]) {
                            keywordCounts1[keyword]++;
                        } else {
                            keywordCounts1[keyword] = 1;
                        }
                    }
                });
            }
            catch (Exception) {

            }

            if (dateCounts[dateKey]) {
                dateCounts[dateKey]++;
            } else {
                dateCounts[dateKey] = 1;
            }

        });



        // Populate db array from keywordCounts1
        for (var keyword in Country_Count) {
            // Get the abbreviation for the country
            var abbreviation = countryAbbreviations[keyword];
            // Push the data to db_Country array
            db_Country.push({ "title": keyword, "id": abbreviation, "customData": Country_Count[keyword] });
        }

        var social_content_container = document.querySelector('.videos__container-twitter');

        for (var keyword in twitter_title) {
            var card = document.createElement('div');
            card.className = 'video';

            var card_thumbnail = document.createElement('div');
            card_thumbnail.className = "video__thumbnail";

            if (twitter_imagesUrl[keyword]) {
                var card_thumbnail = document.createElement('a');
                card_thumbnail.href = twitter_link[keyword];
                card_thumbnail.target = "_blank";

                var img = document.createElement('img');
                img.src = twitter_imagesUrl[keyword];
                img.className = "video__thumbnail";

                card_thumbnail.appendChild(img);
            } else {
                var card_thumbnail = document.createElement('a');
                card_thumbnail.href = twitter_link[keyword];
                card_thumbnail.target = "_blank";

                var img = document.createElement('img');
                img.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhvY2NtN29taGxzaXhzNzZveG1vMWp4dW8xc3Y0MHhjZ2x2djRpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.webp';
                img.className = "video__thumbnail";

                card_thumbnail.appendChild(img);
            }

            card.appendChild(card_thumbnail);

            var card_details = document.createElement('div');
            card_details.className = "video__details";

            card.appendChild(card_details);

            var card_author = document.createElement('div');
            card_author.className = "author";

            card_details.appendChild(card_author);

            var card_thumbnail = document.createElement('img');
            card_thumbnail.src = 'https://cdn.dribbble.com/userupload/8807749/file/original-6c8fab277dc6130e6a2d15e4d66c8f60.gif';
            card_thumbnail.className = "video__thumbnail";

            card_author.appendChild(card_thumbnail);

            var titleDiv = document.createElement('div');
            titleDiv.className = 'title';

            card_details.appendChild(titleDiv)

            // Create the h3 element
            var titleHeading = document.createElement('h3');
            titleHeading.textContent = twitter_title[keyword].substring(0, 50);

            titleDiv.appendChild(titleHeading)

            // Create the view and time span
            var viewTimeSpan = document.createElement('span');
            viewTimeSpan.textContent = twitter_description[keyword].substring(0, 100);

            titleDiv.appendChild(viewTimeSpan)

            // Create the author link
            var authorLink = document.createElement('a');
            authorLink.href = twitter_link[keyword];
            authorLink.target = "_blank";
            authorLink.textContent = 'Continue Reading';

            titleDiv.appendChild(authorLink)

            social_content_container.appendChild(card);

        }
    })

var instagram_title = [];
var instagram_description = [];
var instagram_imagesUrl = []; // Initialize the array to store image URLs
var instagram_link = [];

const RS_Ins_URL = "https://rss.app/feeds/R0w63J0JXfV0TSXP.xml";
fetchWithMultipleProxies(RS_Ins_URL)
    .then(data => {
        // Parse the XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Select each <item> element
        const items = xmlDoc.querySelectorAll('item');

        // Iterate over each <item> element
        items.forEach(item => {
            var title = item.querySelector('title').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');;
            var description = item.querySelector('description').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');;
            var mediaContent = item.querySelector('content');
            var link = item.querySelector('link').textContent;
            var pubDate = new Date(item.querySelector('pubDate').textContent);
            var dateKey = pubDate.toDateString(); // Use date as key
            var pubDateStr = new Date(pubDate);
            parsedPubDates.push({ original: pubDate, parsed: pubDateStr });

            try {
                // Extract words from title and description
                var words = title.split(/\s+/).concat(description.split(/\s+/));

                instagram_title.push(title);

                instagram_description.push(description);

                instagram_link.push(link);

                // Add the imageUrl to the array
                instagram_imagesUrl.push(mediaContent.getAttribute('url'));

                // Update keywords1 and keywordCounts1
                words.forEach(word => {
                    if (word) { // Check if the word is not empty
                        if (!keywords1.includes(word)) {
                            keywords1.push(word);
                        }
                        if (keywordCounts1[word]) {
                            keywordCounts1[word]++;
                        } else {
                            keywordCounts1[word] = 1;
                        }
                    }
                });


                // Check if any of the keywords are present in the title or description
                sentiments_keyword_positive.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_positive[keyword]) {
                            sentiments_keyword_count_positive[keyword]++;
                        } else {
                            sentiments_keyword_count_positive[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_negative.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_negative[keyword]) {
                            sentiments_keyword_count_negative[keyword]++;


                        } else {
                            sentiments_keyword_count_negative[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_Uncertainty.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_Uncertainty[keyword]) {
                            sentiments_keyword_count_Uncertainty[keyword]++;


                        } else {
                            sentiments_keyword_count_Uncertainty[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_Litigious.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_Litigious[keyword]) {
                            sentiments_keyword_count_Litigious[keyword]++;


                        } else {
                            sentiments_keyword_count_Litigious[keyword] = 1;
                        }
                    }
                });


                // Check if any of the keywords are present in the title or description
                keywords1.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (keywordCounts1[keyword]) {
                            keywordCounts1[keyword]++;
                        } else {
                            keywordCounts1[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                Country.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (Country_Count[keyword]) {
                            Country_Count[keyword]++;

                        } else {
                            Country_Count[keyword] = 1;
                        }
                    }
                });

                if (dateCounts[dateKey]) {
                    dateCounts[dateKey]++;
                } else {
                    dateCounts[dateKey] = 1;
                }
            }
            catch (Exception) {

            }
        });

        // Populate db array from keywordCounts1
        for (var keyword in Country_Count) {
            // Get the abbreviation for the country
            var abbreviation = countryAbbreviations[keyword];
            // Push the data to db_Country array
            db_Country.push({ "title": keyword, "id": abbreviation, "customData": Country_Count[keyword] });
        }


        var social_content_container = document.querySelector('.videos__container-instagram');

        for (var keyword in instagram_title) {
            var card = document.createElement('div');
            card.className = 'video';

            var card_thumbnail = document.createElement('div');
            card_thumbnail.className = "video__thumbnail";

            if (instagram_imagesUrl[keyword]) {
                var card_thumbnail = document.createElement('a');
                card_thumbnail.href = instagram_link[keyword];
                card_thumbnail.target = "_blank";

                var img = document.createElement('img');
                img.src = instagram_imagesUrl[keyword];
                img.className = "video__thumbnail";

                card_thumbnail.appendChild(img);
            } else {
                var card_thumbnail = document.createElement('a');
                card_thumbnail.href = instagram_link[keyword];
                card_thumbnail.target = "_blank";

                var img = document.createElement('img');
                img.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhvY2NtN29taGxzaXhzNzZveG1vMWp4dW8xc3Y0MHhjZ2x2djRpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.webp';
                img.className = "video__thumbnail";

                card_thumbnail.appendChild(img);
            }

            card.appendChild(card_thumbnail);

            var card_details = document.createElement('div');
            card_details.className = "video__details";

            card.appendChild(card_details);

            var card_author = document.createElement('div');
            card_author.className = "author";

            card_details.appendChild(card_author);

            var card_thumbnail = document.createElement('img');
            card_thumbnail.src = 'https://media1.tenor.com/m/VT6FD07iaBgAAAAC/instagram-mycrxn.gif';
            card_thumbnail.className = "video__thumbnail";

            card_author.appendChild(card_thumbnail);

            var titleDiv = document.createElement('div');
            titleDiv.className = 'title';

            card_details.appendChild(titleDiv)

            // Create the h3 element
            var titleHeading = document.createElement('h3');
            titleHeading.textContent = instagram_title[keyword].substring(0, 50);

            titleDiv.appendChild(titleHeading)

            // Create the view and time span
            var viewTimeSpan = document.createElement('span');
            viewTimeSpan.textContent = instagram_description[keyword].substring(0, 100);

            titleDiv.appendChild(viewTimeSpan)

            // Create the author link
            var authorLink = document.createElement('a');
            authorLink.href = instagram_link[keyword];
            authorLink.target = "_blank";
            authorLink.textContent = 'Continue Reading';

            titleDiv.appendChild(authorLink)

            social_content_container.appendChild(card);

        }
    })

var tiktok_title = [];
var tiktok_description = [];
var imageUrls = []; // Initialize the array to store image URLs
var tiktok_link = [];

var rssTikTok_URL = 'https://rss.app/feeds/Ta9577UH6x4fuXQH.xml'
fetchWithMultipleProxies(rssTikTok_URL)
    .then(data => {
        // Parse the XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Select each <item> element
        const items = xmlDoc.querySelectorAll('item');

        // Iterate over each <item> element
        items.forEach(item => {
            var title = item.querySelector('title').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');;
            var description = item.querySelector('description').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');;
            var mediaContent = item.querySelector('content');
            var link = item.querySelector('link').textContent;
            var pubDate = new Date(item.querySelector('pubDate').textContent);
            var dateKey = pubDate.toDateString(); // Use date as key
            var pubDateStr = new Date(pubDate);
            parsedPubDates.push({ original: pubDate, parsed: pubDateStr });

            try {
                // Extract words from title and description
                var words = title.split(/\s+/).concat(description.split(/\s+/));

                tiktok_title.push(title);

                tiktok_description.push(description);

                tiktok_link.push(link);

                // Add the imageUrl to the array
                imageUrls.push(mediaContent.getAttribute('url'));

                // Update keywords1 and keywordCounts1
                words.forEach(word => {
                    if (word) { // Check if the word is not empty
                        if (!keywords1.includes(word)) {
                            keywords1.push(word);
                        }
                        if (keywordCounts1[word]) {
                            keywordCounts1[word]++;
                        } else {
                            keywordCounts1[word] = 1;
                        }
                    }
                });


                // Check if any of the keywords are present in the title or description
                sentiments_keyword_positive.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_positive[keyword]) {
                            sentiments_keyword_count_positive[keyword]++;
                        } else {
                            sentiments_keyword_count_positive[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_negative.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_negative[keyword]) {
                            sentiments_keyword_count_negative[keyword]++;


                        } else {
                            sentiments_keyword_count_negative[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_Uncertainty.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_Uncertainty[keyword]) {
                            sentiments_keyword_count_Uncertainty[keyword]++;


                        } else {
                            sentiments_keyword_count_Uncertainty[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                sentiments_keyword_Litigious.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (sentiments_keyword_count_Litigious[keyword]) {
                            sentiments_keyword_count_Litigious[keyword]++;


                        } else {
                            sentiments_keyword_count_Litigious[keyword] = 1;
                        }
                    }
                });

                // Check if any of the keywords are present in the title or description
                keywords1.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (keywordCounts1[keyword]) {
                            keywordCounts1[keyword]++;
                        } else {
                            keywordCounts1[keyword] = 1;
                        }
                    }

                });

                // Check if any of the keywords are present in the title or description
                Country.forEach(keyword => {
                    if (title.includes(keyword) || description.includes(keyword)) {
                        if (Country_Count[keyword]) {
                            Country_Count[keyword]++;

                        } else {
                            Country_Count[keyword] = 1;
                        }
                    }
                });

                // Count occurrences of each date
                if (dateCounts[dateKey]) {
                    dateCounts[dateKey]++;
                } else {
                    dateCounts[dateKey] = 1;
                }

            } catch (Exception) {

            }

        });

        // Populate db array from keywordCounts1
        for (var keyword in Country_Count) {
            // Get the abbreviation for the country
            var abbreviation = countryAbbreviations[keyword];
            // Push the data to db_Country array
            db_Country.push({ "title": keyword, "id": abbreviation, "customData": Country_Count[keyword] });
        }

        var social_content_container = document.querySelector('.videos__container-tiktok');

        for (var keyword in tiktok_title) {
            var card = document.createElement('div');
            card.className = 'video';

            var card_thumbnail = document.createElement('div');
            card_thumbnail.className = "video__thumbnail";

            if (imageUrls[keyword]) {
                var card_thumbnail = document.createElement('a');
                card_thumbnail.href = tiktok_link[keyword];
                card_thumbnail.target = "_blank";

                var img = document.createElement('img');
                img.src = imageUrls[keyword];
                img.className = "video__thumbnail";

                card_thumbnail.appendChild(img);
            } else {
                var card_thumbnail = document.createElement('a');
                card_thumbnail.href = tiktok_link[keyword];
                card_thumbnail.target = "_blank";

                var img = document.createElement('img');
                img.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhvY2NtN29taGxzaXhzNzZveG1vMWp4dW8xc3Y0MHhjZ2x2djRpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.webp';
                img.className = "video__thumbnail";

                card_thumbnail.appendChild(img);
            }

            card.appendChild(card_thumbnail);

            var card_details = document.createElement('div');
            card_details.className = "video__details";

            card.appendChild(card_details);

            var card_author = document.createElement('div');
            card_author.className = "author";

            card_details.appendChild(card_author);

            var card_thumbnail = document.createElement('img');
            card_thumbnail.src = 'https://media1.tenor.com/m/J5e99wBIPJAAAAAC/tiktok.gif';
            card_thumbnail.className = "video__thumbnail";

            card_author.appendChild(card_thumbnail);

            var titleDiv = document.createElement('div');
            titleDiv.className = 'title';

            card_details.appendChild(titleDiv)

            // Create the h3 element
            var titleHeading = document.createElement('h3');
            titleHeading.textContent = tiktok_title[keyword].substring(0, 50);

            titleDiv.appendChild(titleHeading)

            // Create the view and time span
            var viewTimeSpan = document.createElement('span');
            viewTimeSpan.textContent = tiktok_description[keyword].substring(0, 100);

            titleDiv.appendChild(viewTimeSpan)

            // Create the author link
            var authorLink = document.createElement('a');
            authorLink.href = instagram_link[keyword];
            authorLink.target = "_blank";
            authorLink.textContent = 'Continue Reading';

            titleDiv.appendChild(authorLink)

            social_content_container.appendChild(card);

        }
    })

var Second_URL = 'https://rss.app/feeds/_dnMCrP1iDlZOLZYG.xml'
fetchWithMultipleProxies(Second_URL)
    .then(data => {
        // Parse the contents as XML
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, 'application/xml');
        var items = xmlDoc.querySelectorAll('item');


        items.forEach(item => {
            var title = item.querySelector('title').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');
            var description = item.querySelector('description').textContent.toLowerCase().replace(/(<([^>]+)>)/ig, '');
            var link = item.querySelector('link').textContent;
            var links = item.querySelectorAll('link');
            var item_creator = item.querySelector('creator').textContent.trim();
            var pubDate = new Date(item.querySelector('pubDate').textContent);
            var dateKey = pubDate.toDateString(); // Use date as key
            var pubDateStr = new Date(pubDate);
            parsedPubDates.push({ original: pubDate, parsed: pubDateStr });

            Creators.push(item_creator);

            // Extract words from title and description
            var words = title.split(/\s+/).concat(description.split(/\s+/));

            links.forEach(link => {
                // Extract domain from link
                var domain = extractDomain(link.textContent.trim());

                if (keywordCounts2[domain]) {
                    keywordCounts2[domain] += 1;
                } else {
                    keywordCounts2[domain] = 1;
                }
            });

            RSSTitleCount.push(title);
            // Trim description to 250 characters
            var trimmedDescription = description.substring(0, 250);
            // Add "Continue Reading" link
            var continueReadingLink = isBadComment(description) + ` <a href="${link}" target="_blank">Continue Reading</a>`; // Use 'link' variable here
            // Concatenate trimmed description with "Continue Reading" link
            var trimmedDescriptionWithLink = trimmedDescription + ' ' + continueReadingLink;
            // Add the trimmed description with link to array
            RSSDescriptionCount.push(trimmedDescriptionWithLink);

            RSSLinks.push(link); // Push the link for each news item

            // Update keywords1 and keywordCounts1
            words.forEach(word => {
                if (word) { // Check if the word is not empty
                    if (!keywords1.includes(word)) {
                        keywords1.push(word);
                    }
                    if (keywordCounts1[word]) {
                        keywordCounts1[word]++;
                    } else {
                        keywordCounts1[word] = 1;
                    }
                }
            });

            // Check if any of the keywords are present in the title or description
            keywords1.forEach(keyword => {
                if (title.includes(keyword) || description.includes(keyword)) {
                    if (keywordCounts1[keyword]) {
                        keywordCounts1[keyword]++;
                    } else {
                        keywordCounts1[keyword] = 1;
                    }
                }
            });

            // Check if any of the keywords are present in the title or description
            Country.forEach(keyword => {
                if (title.includes(keyword) || description.includes(keyword)) {
                    if (Country_Count[keyword]) {
                        Country_Count[keyword]++;

                    } else {
                        Country_Count[keyword] = 1;
                    }
                }
            });

            // Check if any of the keywords are present in the title or description
            sentiments_keyword_positive.forEach(keyword => {
                if (title.includes(keyword) || description.includes(keyword)) {
                    if (sentiments_keyword_count_positive[keyword]) {
                        sentiments_keyword_count_positive[keyword]++;
                    } else {
                        sentiments_keyword_count_positive[keyword] = 1;
                    }
                }
            });

            // Check if any of the keywords are present in the title or description
            sentiments_keyword_negative.forEach(keyword => {
                if (title.includes(keyword) || description.includes(keyword)) {
                    if (sentiments_keyword_count_negative[keyword]) {
                        sentiments_keyword_count_negative[keyword]++;


                    } else {
                        sentiments_keyword_count_negative[keyword] = 1;
                    }
                }
            });

            // Check if any of the keywords are present in the title or description
            sentiments_keyword_Uncertainty.forEach(keyword => {
                if (title.includes(keyword) || description.includes(keyword)) {
                    if (sentiments_keyword_count_Uncertainty[keyword]) {
                        sentiments_keyword_count_Uncertainty[keyword]++;


                    } else {
                        sentiments_keyword_count_Uncertainty[keyword] = 1;
                    }
                }
            });

            // Check if any of the keywords are present in the title or description
            sentiments_keyword_Litigious.forEach(keyword => {
                if (title.includes(keyword) || description.includes(keyword)) {
                    if (sentiments_keyword_count_Litigious[keyword]) {
                        sentiments_keyword_count_Litigious[keyword]++;


                    } else {
                        sentiments_keyword_count_Litigious[keyword] = 1;
                    }
                }
            });

            // Count occurrences of each date
            if (dateCounts[dateKey]) {
                dateCounts[dateKey]++;
            } else {
                dateCounts[dateKey] = 1;
            }
            var randomColorIndex = Math.floor(Math.random() * colors.length);

            // Initialize the data array for the chart
            var chartData = [];

            // Iterate over each date entry in dateCounts object
            Object.keys(dateCounts).forEach(dateKey => {
                // Generate a random color for each date entry
                var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

                // Create a data object for the current date entry
                var dataObject = {
                    "Date": dateKey,
                    "Date Count": dateCounts[dateKey],
                    "color": randomColor
                };

                // Push the data object to the chartData array
                chartData.push(dataObject);
            });
            // Sort the chartData array by Date Count in descending order and take the top 5
            chartData.sort((a, b) => b["Date Count"] - a["Date Count"]);
            chartData = chartData.slice(0, 5);


            // Create the chart with the modified data
            var chart = AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "startDuration": 2,
                "dataProvider": chartData, // Use the modified chartData array
                "valueAxes": [{
                    "position": "left",
                    "axisAlpha": 0,
                    "gridAlpha": 0
                }],
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "colorField": "color",
                    "fillAlphas": 0.85,
                    "lineAlpha": 0.1,
                    "type": "column",
                    "topRadius": 1,
                    "valueField": "Date Count"
                }],
                "depth3D": 40,
                "angle": 30,
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "Date",
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "gridAlpha": 0
                },
                "exportConfig": {
                    "menuTop": "20px",
                    "menuRight": "20px",
                    "menuItems": [{
                        "icon": '/lib/3/images/export.png',
                        "format": 'png'
                    }]
                }
            }, 0);
        });

        // Convert keyword counts to legend data
        var legendData1 = Object.keys(keywordCounts1).map(keyword => {
            return { name: keyword, value: keywordCounts1[keyword] };
        });

        // Sort legend data by value in descending order
        legendData1.sort((a, b) => b.value - a.value);

        // Limit to top 10 items
        legendData1 = legendData1.slice(0, 10);

        // Populate legend for chart 1
        var legendElement1 = $(".pieID.legend1");
        legendData1.forEach(item => {
            legendElement1.append(`<li><em>${item.name}</em><span>${item.value}</span></li>`);
        });

        // Create pie chart 1
        createPie(".pieID.legend1", ".pieID.pie1", legendData1, colors);

        //For Graph Link
        var legendData2 = Object.keys(keywordCounts2).map(keyword => {
            return { name: keyword, value: keywordCounts2[keyword] };
        });

        legendData2.sort((a, b) => b.value - a.value);

        // Populate legend for chart 2
        var legendElement2 = $(".pieID.legend2");
        legendData2.forEach(item => {
            legendElement2.append(`<li><em>${item.name}</em><span>${item.value}</span></li>`);
        });

        // Create pie chart 2
        createPie(".pieID.legend2", ".pieID.pie2", legendData2, colors);

        //For Overall
        // Take only the first 8 items
        var firstFiveCounts = RSSTitleCount.slice(0, 8);
        var firstFiveDescriptions = RSSDescriptionCount.slice(0, 8);

        // Create legend for news with a limit of 5 items
        var legendlinks = RSSLinks.slice(0, 8).map((link, index) => { // Changed 'title' to 'link' in the map function parameter
            return { name: firstFiveCounts[index], link: link }; // Use 'link' variable instead of 'LiveNewsLink'
        });

        legendlinks.sort((a, b) => b.value - a.value);

        // Populate legend for news
        var legendElementLiveNews = $(".pieID.alertph_dash");
        firstFiveCounts.forEach((count, index) => {
            var description = firstFiveDescriptions[index];
            legendElementLiveNews.append(`<li><span><em>${count}</em><br><br>${description}</span></li>`);
        });

        // Populate legend for news
        var legendElementlinks = $(".pieID.legendlinks");
        legendlinks.forEach(item => {
            legendElementlinks.append(`<li><span><em>${item.name}</em><br><br><a href="${item.link}" target="_blank">${item.link}</a></span></li>`); // Use 'item.link' for the link
        });

        // Populate db array from keywordCounts1
        for (var keyword in keywordCounts1) {
            db_keyword.push({ "word": keyword, "weight": keywordCounts1[keyword] });
        }

        // Populate db array from keywordCounts1
        for (var keyword in Country_Count) {
            // Get the abbreviation for the country
            var abbreviation = countryAbbreviations[keyword];
            // Push the data to db_Country array
            db_Country.push({ "title": keyword, "id": abbreviation, "customData": Country_Count[keyword] });
        }

        $(document).ready(function () {
            $.getScript("https://cdn.jsdelivr.net/gh/jehoiakim1010/Data_Link@main/jQWCloudv3.4.1.js")
                .done(function () {
                    $("#wordCloud").jQWCloud({
                        words: db_keyword,
                        minFont: 10,
                        maxFont: 50,
                        //fontOffset: 5,
                        //cloud_font_family: 'Owned',
                        //verticalEnabled: false,
                        padding_left: 1,
                        //showSpaceDIV: true,
                        //spaceDIVColor: 'white',
                        word_common_classes: 'WordClass',
                        word_mouseEnter: function () {
                            var word = $(this).text();
                            var weight = db_keyword.find(item => item.word === word).weight;
                            $(this).css("text-decoration", "underline");
                            $(this).attr('title', `Number Of Count: ${weight}`);
                        },
                        word_mouseOut: function () {
                            $(this).css("text-decoration", "none");
                        },
                        word_click: function () {
                            alert("You have selected:" + $(this).text());
                        },
                        beforeCloudRender: function () {
                            date1 = new Date();
                        }
                        /*
                        afterCloudRender: function () {
                            var date2 = new Date();
                            console.log("Cloud Completed in " + (date2.getTime() - date1.getTime()) + " milliseconds");
                        }
                        */
                    });
                });
        });


        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("chartdiv1", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldHigh;

        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Export
        chart.exporting.menu = new am4core.ExportMenu();

        // Zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        var homeButton = new am4core.Button();
        homeButton.events.on("hit", function () {
            chart.goHome();
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = chart.zoomControl;
        homeButton.insertBefore(chart.zoomControl.plusButton);

        // Center on the groups by default
        chart.homeZoomLevel = 0;
        // chart.homeGeoPoint = { longitude: 10, latitude: 52 };

        var groupData = [
            {
                "name": "Countries",
                "color": chart.colors.getIndex(0),
                "data": db_Country
            }
        ];

        // This array will be populated with country IDs to exclude from the world series
        var excludedCountries = ["AQ"];

        // Create a series for each group, and populate the above array
        groupData.forEach(function (group) {
            var series = chart.series.push(new am4maps.MapPolygonSeries());
            series.name = group.name;
            series.useGeodata = true;
            var includedCountries = [];
            group.data.forEach(function (country) {
                includedCountries.push(country.id);
                excludedCountries.push(country.id);
            });
            series.include = includedCountries;

            series.fill = am4core.color(group.color);

            // By creating a hover state and setting setStateOnChildren to true, when we
            // hover over the series itself, it will trigger the hover SpriteState of all
            // its countries (provided those countries have a hover SpriteState, too!).
            series.setStateOnChildren = true;
            series.calculateVisualCenter = true;

            // Country shape properties & behaviors
            var mapPolygonTemplate = series.mapPolygons.template;
            // Instead of our custom title, we could also use {name} which comes from geodata  
            mapPolygonTemplate.fill = am4core.color(group.color);
            mapPolygonTemplate.fillOpacity = 0.8;
            mapPolygonTemplate.nonScalingStroke = true;
            mapPolygonTemplate.tooltipPosition = "fixed"

            mapPolygonTemplate.events.on("over", function (event) {
                series.mapPolygons.each(function (mapPolygon) {
                    mapPolygon.isHover = true;
                })
                event.target.isHover = false;
                event.target.isHover = true;
            })

            mapPolygonTemplate.events.on("out", function (event) {
                series.mapPolygons.each(function (mapPolygon) {
                    mapPolygon.isHover = false;
                })
            })

            // States  
            var hoverState = mapPolygonTemplate.states.create("hover");
            hoverState.properties.fill = am4core.color("#CC0000");

            // Tooltip
            mapPolygonTemplate.tooltipText = "{title} Data: {customData}"; // enables tooltip
            // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover
            // series.tooltip.background.fill = am4core.color(group.color);

            // MapPolygonSeries will mutate the data assigned to it, 
            // we make and provide a copy of the original data array to leave it untouched.
            // (This method of copying works only for simple objects, e.g. it will not work
            //  as predictably for deep copying custom Classes.)
            series.data = JSON.parse(JSON.stringify(group.data));
        });

        // The rest of the world.
        var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
        var worldSeriesName = "world";
        worldSeries.name = worldSeriesName;
        worldSeries.useGeodata = true;
        worldSeries.exclude = excludedCountries;
        worldSeries.fillOpacity = 0.8;
        worldSeries.hiddenInLegend = true;
        worldSeries.mapPolygons.template.nonScalingStroke = true;

        // This auto-generates a legend according to each series' name and fill
        chart.legend = new am4maps.Legend();

        // Legend styles
        chart.legend.paddingLeft = 27;
        chart.legend.paddingRight = 27;
        chart.legend.marginBottom = 15;
        chart.legend.width = am4core.percent(90);
        chart.legend.valign = "bottom";
        chart.legend.contentAlign = "left";

        // Legend items
        chart.legend.itemContainers.template.interactionsEnabled = false;

        // Create <div> elements based on the sentiments count
        var ticker_item_Container = document.querySelector('.ticker');

        for (var keyword in RSSTitleCount) {
            var title = RSSTitleCount[keyword];
            var div = document.createElement('div');
            div.className = 'ticker-item';
            div.textContent = title;


            ticker_item_Container.appendChild(div);
        }
        const tickerItems = Array.from(ticker_item_Container.children);

        // Calculate the total width of all ticker items
        const tickerWidth = tickerItems.reduce((total, item) => {
            return total + item.offsetWidth;
        }, 0);

        // Set the animation duration based on the total width
        const animationDuration = tickerWidth / 50; // Adjust speed by changing the denominator
        ticker_item_Container.style.animationDuration = `${animationDuration}s`;


        // Start the animation
        ticker_item_Container.classList.add('moving');



        // Create <li> elements based on the sentiments count
        var chartContainer_positive = document.querySelector('.chart--horiz_positive');
        for (var keyword in sentiments_keyword_count_positive) {
            var count = sentiments_keyword_count_positive[keyword];
            var li = document.createElement('li');
            li.className = 'chart__bar';
            var percentage = (sentiments_keyword_count_positive[keyword]);
            li.style.width = percentage + '%';
            li.setAttribute('data-percentage', percentage.toFixed(2));

            var span = document.createElement('span');
            span.className = 'chart__label';
            span.textContent = keyword; // Display count in label

            li.appendChild(span);
            chartContainer_positive.appendChild(li);
        }

        var chartContainer_negative = document.querySelector('.chart--horiz_negative');
        for (var keyword in sentiments_keyword_count_negative) {
            var count = sentiments_keyword_count_negative[keyword];
            var li = document.createElement('li');
            li.className = 'chart__bar';
            var percentage = (sentiments_keyword_count_negative[keyword]);
            li.style.width = percentage + '%';
            li.setAttribute('data-percentage', percentage.toFixed(2));

            var span = document.createElement('span');
            span.className = 'chart__label';
            span.textContent = keyword; // Display count in label

            li.appendChild(span);
            chartContainer_negative.appendChild(li);
        }

        var chartContainer_Uncertainty = document.querySelector('.chart--horiz_uncertainty');
        for (var keyword in sentiments_keyword_count_Uncertainty) {
            var count = sentiments_keyword_count_Uncertainty[keyword];
            var li = document.createElement('li');
            li.className = 'chart__bar';
            var percentage = (sentiments_keyword_count_Uncertainty[keyword]);
            li.style.width = percentage + '%';
            li.setAttribute('data-percentage', percentage.toFixed(2));

            var span = document.createElement('span');
            span.className = 'chart__label';
            span.textContent = keyword; // Display count in label

            li.appendChild(span);
            chartContainer_Uncertainty.appendChild(li);
        }

        var chartContainer_Litigious = document.querySelector('.chart--horiz_litigious');
        for (var keyword in sentiments_keyword_count_Litigious) {
            var count = sentiments_keyword_count_Litigious[keyword];
            var li = document.createElement('li');
            li.className = 'chart__bar';
            var percentage = (sentiments_keyword_count_Litigious[keyword]);
            li.style.width = percentage + '%';
            li.setAttribute('data-percentage', percentage.toFixed(2));

            var span = document.createElement('span');
            span.className = 'chart__label';
            span.textContent = keyword; // Display count in label

            li.appendChild(span);
            chartContainer_Litigious.appendChild(li);
        }

        orderType = 'DESC';

        for (var i = 0; i < Creators.length; i++) {
            var ul = document.getElementById('followers-list');
            var li = document.createElement("li");
            li.classList.add("follower-item"); // Add specific class
            var a = document.createElement("a");
            var img = document.createElement("img");
            var str = document.createElement("strong");
            var spn = document.createElement("span");
            var user = Creators[i].split('@');
            var lett = Creators[i].charAt(0);
            li.setAttribute('data-index', i);
            li.setAttribute('data-name', user[0]);
            li.setAttribute('data-index', ('0' + i).slice(-2));
            li.appendChild(a);
            img.setAttribute('src', 'https://eu.ui-avatars.com/api/?background=random&name=' + lett + '&font-size=0.6');
            a.appendChild(img);
            str.appendChild(document.createTextNode(user));
            a.appendChild(str);
            spn.appendChild(document.createTextNode('@' + user));
            a.appendChild(spn);
            a.setAttribute('href', 'https://www.google.com/search?q=' + user);
            a.setAttribute('target', '_blank');
            ul.appendChild(li);
        }

        document.getElementById('order-by').addEventListener('click', function () {
            if (this.innerText == 'NAME') {
                this.innerText = 'DATE';
                Array.from(document.querySelectorAll("ul > li.follower-item[data-index]"))
                    .sort(({ dataset: { index: a } }, { dataset: { index: b } }) => orderType == 'DESC' ? a.localeCompare(b) : b.localeCompare(a))
                    .forEach((item) => item.parentNode.appendChild(item));
            } else {
                this.innerText = 'NAME';
                Array.from(document.querySelectorAll("ul > li.follower-item[data-name]"))
                    .sort(({ dataset: { name: a } }, { dataset: { name: b } }) => orderType == 'ASC' ? a.localeCompare(b) : b.localeCompare(a))
                    .forEach((item) => item.parentNode.appendChild(item));
            }
        });

        document.getElementById('order-type').addEventListener('click', function () {
            this.innerText == 'ASC' ? this.innerText = 'DESC' : this.innerText = 'ASC';
            orderType == 'ASC' ? orderType = 'DESC' : orderType = 'ASC';
            document.getElementById('order-by').click();
            document.getElementById('order-by').click();
        });

    })

function isBadComment(description) {
    // Convert the description to lowercase for case-in-sensitive matching
    const lowerDescription = description.toLowerCase();

    // Check if the description contains any bad keywords
    for (const keyword of sentiments_keyword_negative) {
        if (lowerDescription.includes(keyword)) {
            return "<img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/203c.gif' alt='Badword' width='20' height='20' />";// Description contains a bad keyword
        }
    }

    return "<img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/2705.gif' alt='NoBadword' width='20' height='20' />"; // Description does not contain any bad keywords
}
//Slice Size
function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
}
//Add Slice
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("." + sliceID).css({
        "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
    });
    $("." + sliceID + " span").css({
        "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color
    });
}

function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s" + dataCount + "-" + sliceCount;
    var maxSize = 179;
    if (sliceSize <= maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
}

function createPie(dataElement, pieElement, legendData, color) {
    var listData = legendData.map(item => item.value);
    var listTotal = listData.reduce((total, num) => total + num, 0);
    var offset = 0;
    for (var i = 0; i < listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        offset += size;
    }

    // Set border color of each <li> element in the legend
    $(dataElement + " li").each(function (index) {
        $(this).css("border-color", color[index]);
    });
}

function extractDomain(url) {
    let domain;
    // Find & remove protocol (http, https, ftp) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    // Find & remove www
    if (domain.indexOf("www.") > -1) {
        domain = domain.split('www.')[1];
    }
    // Remove any path or parameters after the domain
    domain = domain.split(/[/?#]/)[0];
    // Append .com if the domain does not have any extension
    if (!domain.includes(".")) {
        try {
            const parsedUrl = new URL(url);
            domain = parsedUrl.hostname.replace(/^www\./, ''); // Remove 'www.' if present
        } catch (error) {
            console.error("Error parsing URL:", error);
            domain += ".com";
        }
    }
    return domain;
}
//Timer
(function () {
    var code = `

      // Prevent "Ctrl + U" on desktop (for page source view)
      document.addEventListener("keydown", event => {
        if (event.ctrlKey && (event.key === "u" || event.key === "U")) {
          event.preventDefault();
        }
      });

      // Prevent touch and long press on mobile devices
      document.addEventListener("touchstart", event => {
        // Disable right-click equivalent on touch (long press)
        event.preventDefault();
      });

    // Prevent right-click context menu on both desktop and mobile
      document.addEventListener("contextmenu", event => event.preventDefault());

    document.addEventListener("DOMContentLoaded", function () {
      function updateDateTime() {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        document.getElementById('currentDateTime').innerHTML = new Date().toLocaleDateString('en-US', options);
      }
      setInterval(updateDateTime, 1000);
      updateDateTime();
    });
  `;
    eval(code);
})();
