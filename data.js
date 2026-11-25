// All businesses, events, and locations below are fictional prototype data.
const STARTUP = {
  name: "Local Town Hub",
  tagline: "Find your way around town.",
  pitch: "Everything newcomers need to eat, explore, settle in, and feel at home."
};

const TOWNS = [
  { id: "antigonish", name: "Antigonish", region: "Nova Scotia, Canada", active: true },
  { id: "pictou", name: "Pictou", active: false },
  { id: "new-glasgow", name: "New Glasgow", active: false },
  { id: "port-hawkesbury", name: "Port Hawkesbury", active: false }
];

const AD = {
  name: "Tide & Thistle Bakehouse",
  kicker: "A little local goodness",
  description: "Fresh bakes and a warm cup, just off Main Street.",
  callToAction: "Meet your new coffee stop",
  category: "food-drink"
};

const CATEGORIES = [
  { id: "events", name: "Events", mark: "01", description: "Find a reason to get out and meet the town." },
  { id: "food-drink", name: "Food & drink", mark: "02", description: "A good meal, a quick bite, or your next regular coffee spot." },
  { id: "local-attractions", name: "Local attractions", mark: "03", description: "The places and stories that make this corner of Nova Scotia its own." },
  { id: "outdoors-nature", name: "Outdoors & nature", mark: "04", description: "Fresh air, open trails, and easy ways to spend a day outside." },
  { id: "schools-daycares", name: "Schools & daycares", mark: "05", description: "Start finding the right learning and care options for your family." },
  { id: "services", name: "Services", mark: "06", description: "The practical local help that makes a new place feel familiar." },
  { id: "health-essentials", name: "Health & essentials", mark: "07", description: "Everyday care and essentials, all in one place." },
  { id: "buy-sell", name: "Buy & sell", mark: "08", description: "Local finds, useful furniture, and things ready for a new home." },
  { id: "newcomer-guide", name: "Newcomer guide", mark: "09", description: "A few useful first steps for finding your feet in Antigonish." }
];

const CATEGORY_ORDER = {
  visiting: ["events", "food-drink", "local-attractions", "outdoors-nature", "health-essentials", "newcomer-guide", "schools-daycares", "services", "buy-sell"],
  moving: ["schools-daycares", "services", "health-essentials", "buy-sell", "newcomer-guide", "events", "food-drink", "local-attractions", "outdoors-nature"]
};

const EVENTS = [
  { day: "WED", date: "25", month: "NOV", time: "6:00 PM", name: "Lanterns on the Landing", place: "Harbourview Commons", description: "An easy evening stroll with warm cider and handmade lanterns." },
  { day: "FRI", date: "27", month: "NOV", time: "7:30 PM", name: "Songs from the Shore", place: "The Old Mill Room", description: "A small-room set of folk songs from local musicians." },
  { day: "SUN", date: "29", month: "NOV", time: "10:00 AM", name: "Winter Makers Market", place: "Maple Street Hall", description: "Browse ceramics, preserves, prints, and thoughtful gifts." }
];

const LISTINGS = [
  { id: "fd-1", category: "food-drink", name: "Tide & Thistle Bakehouse", description: "Small-batch pastries, hearty soups, and carefully poured coffee.", address: "18 Harbour Lane, Antigonish, NS", phone: "902-555-0101", rating: 4.8, sponsored: true, filters: ["Cafes"] },
  { id: "fd-2", category: "food-drink", name: "The Copper Kettle Room", description: "A relaxed neighbourhood table for chowder and coastal suppers.", address: "42 Alder Street, Antigonish, NS", phone: "902-555-0102", rating: 4.6, sponsored: false, filters: ["Seafood"] },
  { id: "fd-3", category: "food-drink", name: "Northline Pizza Works", description: "Hand-stretched pies with crisp edges and seasonal toppings.", address: "7 Orchard Road, Antigonish, NS", phone: "902-555-0103", rating: 4.5, sponsored: false, filters: ["Pizza"] },
  { id: "fd-4", category: "food-drink", name: "Juniper & Rice", description: "Fresh maki, warm rice bowls, and a short, thoughtful menu.", address: "63 Millbrook Avenue, Antigonish, NS", phone: "902-555-0104", rating: 4.7, sponsored: false, filters: ["Sushi"] },
  { id: "fd-5", category: "food-drink", name: "Westward Grill House", description: "Juicy griddle burgers, hand-cut fries, and house-made relish.", address: "11 Cedarview Drive, Antigonish, NS", phone: "902-555-0105", rating: 4.4, sponsored: false, filters: ["Burgers"] },
  { id: "fd-6", category: "food-drink", name: "Moss & Morning Cafe", description: "A quiet corner for cardamom buns, toast, and an unhurried coffee.", address: "29 Plover Court, Antigonish, NS", phone: "902-555-0106", rating: 4.6, sponsored: false, filters: ["Cafes"] },

  { id: "la-1", category: "local-attractions", name: "Old Map House", description: "A welcoming local-history room filled with maps, letters, and stories.", address: "3 Lantern Court, Antigonish, NS", phone: "902-555-0111", rating: 4.7, sponsored: true },
  { id: "la-2", category: "local-attractions", name: "Cairn & Coast Lookout", description: "A quiet hilltop viewpoint with a wide sweep of countryside.", address: "26 Meadowgate Road, Antigonish, NS", phone: "902-555-0112", rating: 4.8, sponsored: false },
  { id: "la-3", category: "local-attractions", name: "The Lantern Room Gallery", description: "Rotating exhibits and locally made work in a bright little gallery.", address: "55 Spruce Row, Antigonish, NS", phone: "902-555-0113", rating: 4.5, sponsored: false },

  { id: "on-1", category: "outdoors-nature", name: "Cloverbank Trail Society", description: "Trail notes, seasonal walks, and friendly advice for new hikers.", address: "9 Fernbank Lane, Antigonish, NS", phone: "902-555-0121", rating: 4.8, sponsored: true },
  { id: "on-2", category: "outdoors-nature", name: "Willowbend Picnic Green", description: "Open lawns, picnic tables, and a gentle loop beside the brook.", address: "31 Willowbend Way, Antigonish, NS", phone: "902-555-0122", rating: 4.6, sponsored: false },
  { id: "on-3", category: "outdoors-nature", name: "North Ridge Bike Shed", description: "Basic tune-ups, trail maps, and bike rentals for an afternoon out.", address: "14 Ridgeview Path, Antigonish, NS", phone: "902-555-0123", rating: 4.4, sponsored: false },

  { id: "sd-1", category: "schools-daycares", name: "Little Spruce Learning House", description: "A play-led early learning space with a small outdoor garden.", address: "22 Brookside Crescent, Antigonish, NS", phone: "902-555-0131", rating: 4.7, sponsored: true },
  { id: "sd-2", category: "schools-daycares", name: "Maple Path Family Centre", description: "Family programs, school-readiness activities, and parent meetups.", address: "5 Orchardview Lane, Antigonish, NS", phone: "902-555-0132", rating: 4.5, sponsored: false },
  { id: "sd-3", category: "schools-daycares", name: "Cedar Grove Tutoring Room", description: "One-to-one and small-group support for learners of all ages.", address: "38 Birchfield Street, Antigonish, NS", phone: "902-555-0133", rating: 4.6, sponsored: false },

  { id: "sv-1", category: "services", name: "Good Neighbour Home Care", description: "Small repairs, seasonal checkups, and practical home help.", address: "16 Plover Court, Antigonish, NS", phone: "902-555-0141", rating: 4.8, sponsored: true },
  { id: "sv-2", category: "services", name: "Harbour Thread Alterations", description: "Careful clothing repairs, hemming, and custom adjustments.", address: "49 Alder Street, Antigonish, NS", phone: "902-555-0142", rating: 4.7, sponsored: false },
  { id: "sv-3", category: "services", name: "Northstar Key & Lock", description: "Key cutting, lock changes, and straightforward security advice.", address: "2 Millbrook Avenue, Antigonish, NS", phone: "902-555-0143", rating: 4.5, sponsored: false },

  { id: "he-1", category: "health-essentials", name: "Brookstone Family Pharmacy", description: "Prescriptions, everyday wellness essentials, and helpful guidance.", address: "34 Cedarview Drive, Antigonish, NS", phone: "902-555-0151", rating: 4.7, sponsored: false },
  { id: "he-2", category: "health-essentials", name: "Clearwater Dental Studio", description: "Friendly checkups and family dental care in a calm setting.", address: "8 Harbour Lane, Antigonish, NS", phone: "902-555-0152", rating: 4.6, sponsored: false },
  { id: "he-3", category: "health-essentials", name: "Meadowline Wellness Clinic", description: "A community clinic offering routine appointments and care navigation.", address: "71 Meadowgate Road, Antigonish, NS", phone: "902-555-0153", rating: 4.5, sponsored: false },

  { id: "bs-1", category: "buy-sell", name: "Second Story Finds", description: "Pre-loved furniture and home pieces with plenty of character.", address: "12 Maple Street, Antigonish, NS", phone: "902-555-0161", rating: 4.6, sponsored: true },
  { id: "bs-2", category: "buy-sell", name: "Roundabout Reuse Co-op", description: "A changing mix of books, kitchenware, and household basics.", address: "40 Fernbank Lane, Antigonish, NS", phone: "902-555-0162", rating: 4.8, sponsored: false },
  { id: "bs-3", category: "buy-sell", name: "Little Harbour Kids Exchange", description: "Gently used children's clothes, toys, and rainy-day gear.", address: "6 Spruce Row, Antigonish, NS", phone: "902-555-0163", rating: 4.5, sponsored: false },

  { id: "ng-1", category: "newcomer-guide", name: "Welcome Table Antigonish", description: "A monthly coffee meetup for newcomers, neighbours, and questions.", address: "19 Lantern Court, Antigonish, NS", phone: "902-555-0171", rating: 4.9, sponsored: true },
  { id: "ng-2", category: "newcomer-guide", name: "Townline Welcome Desk", description: "Local orientation, community contacts, and a handy first-week checklist.", address: "27 Main Street, Antigonish, NS", phone: "902-555-0172", rating: 4.7, sponsored: false },
  { id: "ng-3", category: "newcomer-guide", name: "Neighbourhood Notes Exchange", description: "A friendly place to swap local tips and find your first community group.", address: "4 Maple Street, Antigonish, NS", phone: "902-555-0173", rating: 4.6, sponsored: false },

  { id: "ev-1", category: "events", name: "Lanterns on the Landing", description: "An easy evening stroll with warm cider and handmade lanterns.", address: "Harbourview Commons, Antigonish, NS", phone: "902-555-0181", rating: 4.8, sponsored: true },
  { id: "ev-2", category: "events", name: "Songs from the Shore", description: "A small-room set of folk songs from local musicians.", address: "The Old Mill Room, Antigonish, NS", phone: "902-555-0182", rating: 4.7, sponsored: false },
  { id: "ev-3", category: "events", name: "Winter Makers Market", description: "Browse ceramics, preserves, prints, and thoughtful gifts.", address: "Maple Street Hall, Antigonish, NS", phone: "902-555-0183", rating: 4.6, sponsored: false }
];

const MARKET_ITEMS = [
  { id: "market-1", title: "Solid oak writing desk", price: 145, kind: "sale", condition: "Good", description: "Sturdy desk with two drawers and a few small marks from use.", seller: "Avery", sellerRating: 4.9, postedAgo: "3 hours ago", protected: true, icon: "desk" },
  { id: "market-2", title: "City commuter bike", price: 120, kind: "sale", condition: "Good", description: "Recently tuned, with working lights and a rear rack.", seller: "Jordan", sellerRating: 4.8, postedAgo: "Yesterday", protected: true, icon: "bike" },
  { id: "market-3", title: "Snowboard with boots", price: 185, kind: "sale", condition: "Like new", description: "Board, bindings, and boots in good shape. Boots are size 8.", seller: "Casey", sellerRating: 5.0, postedAgo: "2 days ago", protected: false, icon: "snowboard" },
  { id: "market-4", title: "Winter coat and wool blanket", price: 0, kind: "free", condition: "Good", description: "Warm adult small coat and a clean wool blanket. Pickup near downtown.", seller: "Morgan", sellerRating: 4.7, postedAgo: "4 hours ago", protected: false, icon: "coat" },
  { id: "market-5", title: "Intro sociology textbook bundle", price: 38, kind: "sale", condition: "Good", description: "Three used course texts with notes in the margins of one.", seller: "Riley", sellerRating: 4.9, postedAgo: "5 days ago", protected: true, icon: "books" },
  { id: "market-6", title: "Quiet furnished room near campus", price: 690, kind: "rent", condition: "Good", description: "Bright room in a shared home. Heat and internet included; available January.", seller: "Taylor", sellerRating: 4.8, postedAgo: "1 day ago", protected: true, icon: "room" },
  { id: "market-7", title: "One-bedroom upper apartment", price: 1325, kind: "rent", condition: "Like new", description: "Sunny upper flat with laundry, a small balcony, and one parking space.", seller: "Quinn", sellerRating: 4.9, postedAgo: "6 hours ago", protected: false, icon: "apartment" },
  { id: "market-8", title: "Floor lamp and side table", price: 30, kind: "sale", condition: "Fair", description: "Simple matching pieces, both clean and ready for a new place.", seller: "Jamie", sellerRating: 4.6, postedAgo: "1 week ago", protected: false, icon: "lamp" }
];

const TOWN_METER_BASE = {
  localPosters: 42,
  newListingsThisWeek: 24
};

const NEWCOMER_CHECKLIST = [
  { group: "Paperwork", id: "health-card", title: "Provincial health card", tip: "Check Nova Scotia's current application steps and required identification.", category: "health-essentials" },
  { group: "Paperwork", id: "bank-account", title: "Bank account", tip: "Compare account fees and ask what identification to bring.", category: "services" },
  { group: "Paperwork", id: "phone-plan", title: "Phone plan", tip: "Compare coverage around town and your usual commute.", category: "services" },
  { group: "Paperwork", id: "drivers-licence", title: "Driver's licence", tip: "Review licence exchange or testing requirements before booking.", category: "services" },
  { group: "Health", id: "family-doctor", title: "Find a family doctor", tip: "Ask local clinics about accepting patients and intake steps.", category: "health-essentials" },
  { group: "Health", id: "pharmacy", title: "Nearest pharmacy", tip: "Save a nearby pharmacy's hours and contact details.", category: "health-essentials" },
  { group: "Health", id: "emergency-department", title: "Emergency department", tip: "Know where to go before an urgent visit is needed.", category: "health-essentials" },
  { group: "Getting around", id: "bus-routes", title: "Bus routes", tip: "Check the latest route times before planning a trip.", category: "services" },
  { group: "Getting around", id: "taxi", title: "Taxi", tip: "Keep a local taxi contact handy for evenings and bad weather.", category: "services" },
  { group: "Getting around", id: "winter-driving", title: "Winter driving tips", tip: "Plan for changing road conditions and keep a winter kit in the car.", category: "outdoors-nature" },
  { group: "Daily life", id: "groceries", title: "Grocery stores", tip: "Find a convenient shop and note its weekend hours.", category: "food-drink" },
  { group: "Daily life", id: "recycling-garbage", title: "Recycling and garbage days", tip: "Check the collection schedule for your new address.", category: "services" },
  { group: "Daily life", id: "library-card", title: "Library card", tip: "Ask the library what proof of address is needed to join.", category: "local-attractions" },
  { group: "Settling in", id: "newcomer-groups", title: "Newcomer groups", tip: "Try a casual community meetup to start making local connections.", category: "events" },
  { group: "Settling in", id: "places-of-worship", title: "Places of worship", tip: "Look for a community that feels welcoming and right for you." },
  { group: "Settling in", id: "sports-clubs", title: "Sports and clubs", tip: "Pick one activity to try and ask about beginner-friendly sessions.", category: "outdoors-nature" }
];

const BUSINESS_PLANS = [
  { id: "free", name: "Free", price: "$0", interval: "", summary: "A simple starting point for local discovery.", features: ["Basic business listing", "Name, description, and contact details", "Shown in your category's local listings"] },
  { id: "featured", name: "Featured", price: "$29", interval: "/ month", summary: "Stand out while newcomers browse your category.", features: ["Everything in Free", "Shown in Sponsored on your category page", "Clear sponsored placement"] },
  { id: "top-spot", name: "Top spot", price: "$79", interval: "/ month", summary: "Pair category visibility with a spot on the home page.", features: ["Everything in Featured", "Sponsored placement in your category", "Home page ad banner"] }
];