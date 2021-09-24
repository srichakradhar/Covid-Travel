const mongoose = require("mongoose");
const States = require("../models/states");
require("./mongoose");

//setting up the data with states
const states = [
    {
        state: "Header",
        guidelines: [
            {
                guideline: "In terms of passes, permits, quarantine regulations, and other criteria, states have issued their travel instructions for inbound and outgoing travellers. Before arranging your trip, please read the guidelines of your source and destination states thoroughly to ensure a hassle-free journey.",
            },
            {
                guideline: "These policies were last updated on July 21, 2021, and are subject to change. Passengers should check for any recent information from the relevant authorities and ensure that they are followed."
            }
        ]
    },
    {
        state: "General",
        guidelines: [
            {
                guideline: "It is suggested that all passengers download the Aarogya Setu app to their mobile phones.",
            },
            {
                guideline: "All passengers must wear face coverings or masks and adhere to strict hand, respiratory, and environmental hygiene guidelines."
            },
            {
                guideline: "At bus terminals, all passengers must adhere to social distancing standards."
            },
            {
                guideline: "Passengers who have a quarantine seal will not be permitted to board the bus."
            }
        ]
    },
    {
        state: "TamilNadu",
        guidelines: [
            {
                guideline: "Epass is now required for all visitors entering Tamil Nadu."
            },
        ],
        tourist_spots: [
            {
                spot: "Meenakshi Amman Temple"
            },
            {
                spot: "Brihadeeswara Temple"
            },
            {
                spot: "Kanyakumari Seashore"
            }
        ],
        descriptions: [
            {
                point: "A land of cultural and religious heritage, Tamil Nadu is one of the beautiful places in India for tourists or pilgrims to visit."
            },
            {
                point: "Many tourists visit Tamil Nadu to see the famous Meenakshi Temple in India, Kanyakumari or the beautiful hill station of Ooty."
            }
        ]
    },
    {
        state: "Karnataka",
        guidelines: [
            {
                guideline: "For people travelling from states other than Maharastra and Kerala, no RT-PCR is necessary."
            },
            {
                guideline: "Traveling from Maharashtra and Kerela to Karnataka guidelines: Passengers arriving in Karnataka by bus must provide a negative RT-PCR certificate no older than 72 hours or a vaccination certificate for at least one dose of COVID 19 vaccine."
            }
        ],
        tourist_spots: [
            {
                spot: "Mysore Palace"
            },
            {
                spot: "Lalbagh Botanical Garden"
            },
            {
                spot: "Bannerghatta Biological Park"
            }
        ],
        descriptions: [
            {
                point: "Karnataka is among the top 4 tourist destinations in India. Karnataka is a bouquet of attractions in India."
            },
            {
                point: "There is a lot to see and see everywhere in Karnataka from Belgaum in the north to Bangalore in the south."
            }
        ]
    },
    {
        state: "Kerala",
        guidelines: [
            {
                guideline: "Vaccination Certificate (At Least first dose certificate) or negative RT-PCR certificate within 72 hours."
            },
        ],
        tourist_spots: [
            {
                spot: "Eravikulam National park"
            },
            {
                spot: "Varkala Beach"
            },
            {
                spot: "Athirappilly Water Falls"
            }
        ],
        descriptions: [
            {
                point: "If you are looking for a place for your vacation, where you get a peaceful atmosphere with a spectacular natural view, where you feel refreshed, both your body and soul feel calm, then there is only one place in India Is Kerala."
            },
            {
                point: "It is also known as gods own country"
            }
        ]
    },
    {
        state: "Goa",
        guidelines: [
            {
                guideline: "For persons travelling from outside Goa, a complete vaccination certificate or a COVID-19 negative report from an RT-PCR test conducted up to 72 hours is required."
            },
        ],
        tourist_spots: [
            {
                spot: "Dudhsagar falls"
            },
            {
                spot: "Palolem Beach"
            },
            {
                spot: "Basilica of Bom Jesus"
            }
        ],
        descriptions: [
            {
                point: "Goa is a small state of India, which is surrounded by Maharashtra from the northern side and Karnataka from the east and south."
            },
            {
                point: "There is the Arabian Sea toward its West."
            }
        ]
    },
    {
        state: "Telangana",
        guidelines: [
            {
                guideline: "According to the state government's most recent guidelines, there are no restrictions on interstate travel."
            },
        ],
        tourist_spots: [
            {
                spot: "Charminar"
            },
            {
                spot: "Golconda Fort"
            },
            {
                spot: "Salar Jung Museum"
            }
        ],
        descriptions: [
            {
                point: "Hyderabad is one of the busiest and important cities in India."
            },
            {
                point: "Hyderabad, the capital city of Telangana, is a city that has always savored the colors of the past and the glamor of the present with delicious cuisine."
            }
        ]
    },
    {
        state: "Maharastra",
        guidelines: [
            {
                guideline: "All travellers must have a COVID-19 negative test result from an RT-PCR test performed up to 48 hours before entering Maharashtra."
            },
        ],
        tourist_spots: [
            {
                spot: "Chhatrapati Shivaji Maharaj Terminus"
            },
            {
                spot: "Gateway of India"
            },
            {
                spot: "Ajanta Caves"
            }
        ],
        descriptions: [
            {
                point: "Maharashtra is a major state of India which is also known as 'Gateway of the Heart of India'. Maharashtra is much larger than many other states of the country."
            },
            {
                point: "Maharashtra, the second-most populous state in India is situated right next to Madhya Pradesh in the heart of India."
            }
        ]
    },
    {
        state: "UttarPradesh",
        guidelines: [
            {
                guideline: "According to the state government's most recent guidelines, there are no restrictions on interstate travel."
            },
        ],
        tourist_spots: [
            {
                spot: "Taj Mahal"
            },
            {
                spot: "Agra Fort"
            },
            {
                spot: "Shri Kashi Vishwanath Temple"
            }
        ],
        descriptions: [
            {
                point: "Uttar Pradesh is famous as the Heartland of India. This region is famous worldwide for its cultural heritage and religious importance."
            },
            {
                point: "Tourists from all over the world come to see the Taj Mahal, the most beautiful piece of love."
            }
        ]
    },
    {
        state: "Delhi",
        guidelines: [
            {
                guideline: "According to the state government's most recent guidelines, there are no restrictions on interstate travel."
            },
        ],
        tourist_spots: [
            {
                spot: "Red Fort"
            },
            {
                spot: "Humayun's Tomb"
            },
            {
                spot: "Qutab Minar"
            }
        ],
        descriptions: [
            {
                point: "A symbol of the country’s rich past and thriving present, Delhi is a city where ancient and modern blend seamlessly together."
            },
            {
                point: "It is a place that not only touches your pulse but even fastens it to a frenetic speed. Home to millions of dreams."
            }
        ]
    },
    {
        state: "Gujarat",
        guidelines: [
            {
                guideline: "According to the state government's most recent guidelines, there are no restrictions on interstate travel."
            },
        ],
        tourist_spots: [
            {
                spot: "Giri National Park"
            },
            {
                spot: "Shree Somnath Jyotriliinga Temple"
            },
            {
                spot: "Statue of Unity"
            }
        ],
        descriptions: [
            {
                point: "In India, Gujarat is a place where there are many places to visit according to people of different interests."
            },
            {
                point: "People who are nature lovers will find beautiful sites here, while people who like art, wildlife are also this perfect place."
            },
            {
                point: "It is also the home of Mahatma Gandhi and Sardara Vallabhbhai Patel."
            }
        ]
    },
    {
        state: "WestBengal",
        guidelines: [
            {
                guideline: "Regulatory authorities will ensure that masks are used and other Covid-19 relevant protocol is followed in all public places, transportation, and other areas."
            },
        ],
        tourist_spots: [
            {
                spot: "Victoria Mahal"
            },
            {
                spot: "Sundarban National Park"
            },
            {
                spot: "Indian Museum"
            }
        ],
        descriptions: [
            {
                point: "The state of West Bengal is located in the eastern region of India, which extends from the Himalayas in the north to the Bay of Bengal in the south."
            },
            {
                point: "West Bengal is rich in literature, art, culture and heritage of many former ruling powers."
            }
        ]
    },
    {
        state: "Operators",
        guidelines: [
            {
                guideline: "The seating arrangement on buses/planes is designed to maintain social distancing, which is why only alternating seats are permitted."
            },
            {
                guideline: "Both the staffs and the passengers are required to wear masks throughout the journey."
            },
            {
                guideline: "While boarding the bus/plane, you may be provided a sanitizer spray by some operators."
            },
            {
                guideline: "During boarding, thermal checks are performed, and anyone who registers a high temperature is not permitted to board the bus/plane."
            },
            {
                guideline: "Passengers on a bus are no longer provided with a bottle of drinking water."
            },
            {
                guideline: "After every journey, each bus/plane is subjected to a thorough cleaning and sanitising procedure."
            },
            {
                guideline: "Buses do not stop for drinks or snacks. It goes in a straight line from point A to point B."
            },
            {
                guideline: "For their own and others' safety, passengers are asked to follow these Coronavirus precautions, and anybody with symptoms such as the flu, cough, or respiratory difficulties should not board the bus/plane."
            },
            {
                guideline: "Most buses/planes prohibit children under the age of ten from boarding."
            }
        ]
    }
]

//setting up method to load data
const setUpDatabase = async () => {
    await States.deleteMany();
    for(let i = 0; i < states.length; i++) {
        await new States(states[i]).save();
    }
    await mongoose.disconnect();
}

setUpDatabase();