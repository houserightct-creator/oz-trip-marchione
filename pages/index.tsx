import { useEffect, useState } from 'react';
import { tripDataService } from '../lib/supabase';
import { TripData, Traveler, Flight, ItineraryStop, ScheduleEvent, Checklist, BudgetItem, Contact, DocItem, DayTrip } from '../lib/types';

const uid = () => Math.random().toString(36).slice(2, 9);

const DEFAULT_TRIP_DATA: TripData = {
  passkey: '',
  crew: [
    { id: uid(), name: 'Armando', tag: 'Adult · QF Bronze' },
    { id: uid(), name: 'Rachel', tag: 'Adult' },
    { id: uid(), name: 'Davina', tag: 'Kid' },
    { id: uid(), name: 'Armando Jr', tag: 'Kid' },
    { id: uid(), name: 'Jaxon', tag: 'Infant · Lap' },
  ],
  flights: [
    {
      id: uid(),
      title: 'Getting There • Monday, October 26',
      legs: [
        {
          id: uid(),
          flight: 'AS 1555',
          from: 'Newark (EWR) • Term B',
          dep: '6:05 PM',
          to: 'Los Angeles (LAX) • T6',
          arr: '9:13 PM',
          note: '737-900 • 6h 08m',
        },
        {
          id: uid(),
          flight: 'QF 94',
          from: 'Los Angeles (LAX) • TB',
          dep: '11:50 PM',
          to: 'Melbourne (MEL) • T2',
          arr: '9:30 AM • Oct 28',
          note: '787-9 • 15h 40m • Oct 27 vanishes over the date line',
        },
      ],
    },
    {
      id: uid(),
      title: 'Coming Home • Wednesday, December 2',
      legs: [
        {
          id: uid(),
          flight: 'QF 438',
          from: 'Melbourne (MEL) • T1',
          dep: '11:00 AM',
          to: 'Sydney (SYD) • T3',
          arr: '12:25 PM',
          note: '737 • 1h 25m',
        },
        {
          id: uid(),
          flight: 'QF 7',
          from: 'Sydney (SYD) • T1',
          dep: '2:05 PM',
          to: 'Dallas (DFW) • TD',
          arr: '12:30 PM same day',
          note: 'A380 • 15h 25m • You land before you left',
        },
        {
          id: uid(),
          flight: 'QF 3289',
          from: 'Dallas (DFW)',
          dep: '2:40 PM',
          to: 'NYC La Guardia (LGA) • TB',
          arr: '7:00 PM',
          note: 'AA-operated • 3h 20m',
        },
      ],
    },
  ],
  itinerary: [
    { id: uid(), location: 'Newark → Melbourne', emoji: '✈️', startDate: '2026-10-26', nights: 2, description: 'Depart Newark via Los Angeles, arrive Melbourne Oct 28', tags: ['flight'] },
    { id: uid(), location: 'Melbourne (Oak Park)', emoji: '🏙️', startDate: '2026-10-28', nights: 5, description: 'Home base at Angela\'s place in Oak Park. Great Ocean Road, Taronga Zoo, markets.', tags: ['family', 'culture'] },
    { id: uid(), location: 'Phillip Island', emoji: '🐧', startDate: '2026-11-02', nights: 6, description: 'Penguin Parade, Churchill Island, Seal Rocks. Family area.', tags: ['nature', 'family'] },
    { id: uid(), location: 'Melbourne (Oak Park)', emoji: '🏙️', startDate: '2026-11-08', nights: 10, description: 'Back to base. Day trips, markets, zoo, family dinners.', tags: ['family', 'culture'] },
    { id: uid(), location: 'Queensland / Tasmania (TBD)', emoji: '🌏', startDate: '2026-11-18', nights: 4, description: 'Either Great Barrier Reef & tropics OR Tasmania adventure.', tags: ['nature', 'activity'] },
    { id: uid(), location: 'Melbourne (Oak Park)', emoji: '🏙️', startDate: '2026-11-22', nights: 10, description: 'Final Melbourne stretch. Last visits, goodbyes.', tags: ['family'] },
    { id: uid(), location: 'Sydney', emoji: '🎭', startDate: '2026-12-01', nights: 1, description: 'Overnight in Sydney before departing.', tags: ['culture'] },
    { id: uid(), location: 'Return to Newark', emoji: '🏠', startDate: '2026-12-02', nights: 0, description: 'Depart Sydney via Dallas, arrive Newark Dec 2.', tags: ['flight'] },
  ],
  schedule: [
    { id: uid(), date: '2026-10-26', time: '6:05 PM', title: 'Fly EWR → LAX → MEL', who: 'all' },
    { id: uid(), date: '2026-10-28', time: '9:30 AM', title: 'Land in Melbourne · collect apartment keys', who: 'all' },
    { id: uid(), date: '2026-10-28', time: 'PM', title: 'Groceries + easy walk — fight the jet lag', who: 'all' },
    { id: uid(), date: '2026-12-02', time: '11:00 AM', title: 'Fly MEL → SYD → DFW → LGA', who: 'all' },
  ],
  checklists: [
    {
      id: uid(),
      name: 'Before We Fly',
      items: [
        { id: uid(), text: 'Australian ETA (visa) for all 5 via the Australian ETA app', done: false },
        { id: uid(), text: 'Ensure passports are valid 6+ months past Dec 2', done: false },
        { id: uid(), text: 'Travel insurance covering all 38 days', done: false },
        { id: uid(), text: 'Notify banks and prepare no-foreign-fee cards', done: false },
        { id: uid(), text: 'Sort out eSIM or roaming plan', done: false },
        { id: uid(), text: 'Ensure infant items are tagged: stroller, car seat, cot', done: false },
        { id: uid(), text: 'Vue de Monde: Set alarm for July 31, 8:00 PM EDT', done: false },
        { id: uid(), text: 'Qantas Issue: Call to confirm Dec 2 flight fix', done: false },
      ],
    },
    {
      id: uid(),
      name: 'Packing & General',
      items: [
        { id: uid(), text: 'Power adapters (Type I) x3', done: false },
        { id: uid(), text: 'Spring layers (Melbourne does 4 seasons a day)', done: false },
        { id: uid(), text: 'Sunscreen + hats (Australian UV is serious)', done: false },
        { id: uid(), text: 'Kids\' entertainment for the 15-hour flight', done: false },
        { id: uid(), text: 'Meds in carry-on with prescriptions', done: false },
      ],
    },
    {
      id: uid(),
      name: 'Rachel\'s Packing List',
      items: [
        { id: uid(), text: 'Pick seats for flights, passports, IDs, money/cards', done: false },
        { id: uid(), text: 'Bathing suits, goggles, sunscreen, hats', done: false },
        { id: uid(), text: 'Puddle jumper, car seats, double stroller + skateboard attachment', done: false },
        { id: uid(), text: 'Backpack with leash, backpack carrier for Jaxon', done: false },
        { id: uid(), text: 'Activity packs and iPads for planes', done: false },
      ],
    },
  ],
  budget: [
    { id: uid(), category: 'International Flights', icon: '✈️', amount: 5000, note: 'NYC → Sydney return (family)' },
    { id: uid(), category: 'Domestic Flights', icon: '🛫', amount: 1200, note: 'Uluru, Adelaide, reef/tropics' },
    { id: uid(), category: 'Accommodation', icon: '🛏️', amount: 4500, note: '37 nights mix hotels + family' },
    { id: uid(), category: 'Food & Dining', icon: '🍽️', amount: 2000, note: '$50-55/day avg' },
    { id: uid(), category: 'Activities & Tours', icon: '🦘', amount: 1500, note: 'Penguin Parade, reef, zoo, tours' },
    { id: uid(), category: 'Transport / Car Rental', icon: '🚗', amount: 1000, note: 'Rental car segments' },
    { id: uid(), category: 'Shopping & Souvenirs', icon: '🛍️', amount: 800, note: 'Gifts, clothing' },
    { id: uid(), category: 'Emergency Buffer', icon: '🆘', amount: 1000, note: '6% safety net' },
  ],
  contacts: [
    { id: uid(), name: 'Angela', type: 'family', location: 'Oak Park', notes: 'Home base — near the train line, on a bus route' },
    { id: uid(), name: 'Mum & Dad', type: 'family', location: 'Oak Park + Rosebud', notes: 'House on the street here plus a place at Rosebud' },
    { id: uid(), name: 'Simeon', type: 'family', location: 'Brunswick area', notes: 'Inner north' },
    { id: uid(), name: 'Matthew', type: 'family', location: 'Brunswick area', notes: '' },
    { id: uid(), name: 'Alfred', type: 'family', location: 'Brunswick area', notes: '' },
    { id: uid(), name: 'Renato (Chetti)', type: 'family', location: 'Maribyrnong', notes: 'Inner west' },
    { id: uid(), name: 'Adriana', type: 'family', location: 'East Keilor', notes: 'North-west' },
    { id: uid(), name: 'James', type: 'family', location: 'Altona', notes: 'Bayside west' },
    { id: uid(), name: 'Rosemary', type: 'family', location: 'Inverloch', notes: 'South Gippsland coast' },
    { id: uid(), name: 'Teresa', type: 'family', location: 'Phillip Island', notes: '' },
  ],
  docs: [
    { id: uid(), label: 'Qantas Booking Reference', value: 'FBWNVT' },
    { id: uid(), label: 'Qantas US Phone', value: '1-855-477-9316' },
    { id: uid(), label: 'Emergency in Australia', value: '000 (Police / Fire / Ambulance)' },
    { id: uid(), label: 'Home Base', value: 'Oak Park (near train line + bus route)' },
    { id: uid(), label: 'Wifi Password', value: '—' },
  ],
  dayTrips: [
    { id: uid(), name: 'Great Barrier Reef · scenic flight + pontoon', description: '15–30 min helicopter or seaplane over turquoise Coral Sea. Snorkel or glass-bottom over living coral.', timeframe: 'reef leg · fly to Cairns/Whitsundays', tag: 'reef', votes: 0 },
    { id: uid(), name: 'Lady Elliot Island', description: 'Tiny coral cay eco-resort at reef\'s southern tip. Snorkel with green turtles and manta rays straight off the beach.', timeframe: '2–3 nights · fly from Bundaberg/Gold Coast', tag: 'reef', votes: 0 },
    { id: uid(), name: 'Mon Repos Turtle Centre · Bundaberg', description: 'South Pacific\'s biggest loggerhead rookery. Nesting-turtle encounters nightly from November — ranger walks small groups out to watch mums lay under the stars.', timeframe: 'evening · ranger-guided', tag: 'wildlife', votes: 0 },
    { id: uid(), name: 'Palm Cove · Tropical North Queensland', description: 'Queensland\'s spa capital just north of Cairns. Oceanfront resorts like the Pullman Sea Temple have huge lagoon pools.', timeframe: 'resort base · 3+ nights', tag: 'beach', votes: 0 },
    { id: uid(), name: 'Hamilton Island · Whitsundays', description: 'One of Australia\'s famous family islands: 60+ activities, a Clownfish Club for the kids, and Whitehaven Beach nearby.', timeframe: 'resort base · 3+ nights', tag: 'beach', votes: 0 },
    { id: uid(), name: 'Daintree & Cape Tribulation', description: 'World\'s oldest rainforest meets the reef. Daintree River cruise means croc-spotting from the boat.', timeframe: 'day trip from Palm Cove', tag: 'wildlife', votes: 0 },
    { id: uid(), name: 'Australia Zoo · Beerwah', description: 'Steve Irwin\'s wildlife park. Feed kangaroos, watch giant saltwater crocs, meet the koalas.', timeframe: 'day · Sunshine Coast', tag: 'kids', votes: 0 },
    { id: uid(), name: 'Bluey\'s World · Brisbane', description: 'Life-size walk-through of the Heeler house. Guided treasure hunt, playroom, backyard. Book ahead!', timeframe: '1–2 hrs · Northshore Hamilton', tag: 'kids', votes: 0 },
    { id: uid(), name: 'Phillip Island Penguin Parade', description: 'Little penguins waddle ashore at sunset. Book ahead — the kids will lose their minds.', timeframe: 'day trip · 1.5 hr drive', tag: 'wildlife', votes: 0 },
    { id: uid(), name: 'Great Ocean Road + 12 Apostles', description: 'One of the world\'s great drives. Overnight in Apollo Bay keeps it relaxed with the kids.', timeframe: '1–2 days · 3 hr drive', tag: 'mini trip', votes: 0 },
    { id: uid(), name: 'Puffing Billy Railway', description: 'Century-old steam train through mountain forest. Kids ride with legs out the window.', timeframe: 'half day · Dandenongs', tag: 'kids', votes: 0 },
    { id: uid(), name: 'Yarra Valley + Healesville Sanctuary', description: 'Koalas and kangaroos up close, wineries for the adults, chocolate factory for everyone.', timeframe: 'day trip · 1 hr', tag: 'wildlife', votes: 0 },
    { id: uid(), name: 'Mornington Peninsula', description: 'Hot springs, Brighton beach boxes on the way, strawberry picking in season.', timeframe: 'day trip · 1.5 hr', tag: 'beach', votes: 0 },
    { id: uid(), name: 'St Kilda', description: 'Beach, Luna Park, and a free wild penguin colony at the pier breakwater at dusk.', timeframe: 'easy evening · tram', tag: 'in town', votes: 0 },
    { id: uid(), name: 'Queen Victoria Market', description: 'Melbourne institution. Hot jam doughnuts from the van are mandatory.', timeframe: 'morning · in town', tag: 'in town', votes: 0 },
    { id: uid(), name: 'Melbourne Zoo / SEA LIFE Aquarium', description: 'Reliable rainy-day wins with three kids.', timeframe: 'half day · in town', tag: 'kids', votes: 0 },
    { id: uid(), name: 'Tasmania (Hobart & Cradle Mountain)', description: 'Wallabies and Tasmanian devils at Bonorong, MONA in Hobart, cool-climate scenery.', timeframe: '4–5 days · fly from Melbourne', tag: 'mini trip', votes: 0 },
    { id: uid(), name: 'Sydney long weekend', description: 'You only connect through SYD going home — a mid-trip hop covers Opera House, Bondi, Taronga Zoo.', timeframe: '2–3 days · fly', tag: 'mini trip', votes: 0 },
  ],
  notes: `VISA: US citizens need an ETA (Electronic Travel Authority) for Australia — apply at eta.homeaffairs.gov.au, ~$20 AUD, instant approval usually.

October/November = Australian spring. Melbourne does 4 seasons a day — bring layers!
Uluru = hot days, cold nights even in spring.

Things to book early:
- Qantas flights (done - ref FBWNVT)
- Penguin Parade Phillip Island (must book ahead!)
- Vue de Monde reservations (opens Aug 1, 10am Melbourne time)
- Any reef flights or island stays

ISSUE TO FIX: Dec 2 flight departs Melbourne at 11am, but current itinerary has the family in Sydney. Call Qantas to confirm how to fix before travel.`,
};

const TRIP_START = new Date(2026, 9, 26);
const TRIP_END = new Date(2026, 11, 2);

export default function Home() {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [dayTripFilter, setDayTripFilter] = useState('all');

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {
    setLoading(true);
    const pk = 'australia-2026-marchione-family-secret-7hK2m';
    const data = await tripDataService.fetchTrip(pk);
    if (data) {
      setTripData(data);
    } else {
      const newData = { ...DEFAULT_TRIP_DATA, passkey: pk };
      const created = await tripDataService.createTrip(pk, newData);
      if (created) {
        setTripData(created);
      }
    }
    setLoading(false);
  };

  const saveTrip = async () => {
    if (!tripData) return;
    setIsSaving(true);
    await tripDataService.updateTrip(tripData.passkey, tripData);
    setIsSaving(false);
  };

  const updateTripData = (updates: Partial<TripData>) => {
    setTripData(prev => prev ? { ...prev, ...updates } : null);
    saveTrip();
  };

  if (loading) return <div style={styles.container}><div style={{ textAlign: 'center', marginTop: '100px', color: '#D4894A' }}>Loading...</div></div>;
  if (!tripData) return <div style={styles.container}><div style={{ textAlign: 'center', marginTop: '100px', color: '#B83232' }}>Failed to load trip</div></div>;

  const tabs = ['overview', 'schedule', 'itinerary', 'checklists', 'budget', 'explore', 'contacts', 'docs', 'notes'];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>🇦🇺 OZ Trip 2026</h1>
        <p style={styles.subtitle}>Marchione Family — Australia Adventure</p>
        <div style={styles.tabBar}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tabBtn,
                background: activeTab === tab ? '#C4622D' : 'transparent',
                color: activeTab === tab ? '#FDFAF4' : '#D4894A',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.content}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={styles.sectionTitle}>Crew</h2>
            <div style={styles.crewGrid}>
              {tripData.crew.map(member => (
                <div key={member.id} style={styles.card}>
                  <div style={styles.cardTitle}>{member.name}</div>
                  <div style={styles.cardMeta}>{member.tag}</div>
                </div>
              ))}
            </div>

            <h2 style={styles.sectionTitle}>Flights</h2>
            {tripData.flights.map(flight => (
              <div key={flight.id} style={styles.card}>
                <div style={styles.cardTitle}>{flight.title}</div>
                {flight.legs.map((leg, idx) => (
                  <div key={leg.id} style={{ marginTop: idx > 0 ? '12px' : '0' }}>
                    <div style={styles.legTitle}>{leg.flight}</div>
                    <div style={styles.legDetail}>{leg.from}</div>
                    <div style={styles.time}>{leg.dep}</div>
                    <div style={styles.arrow}>↓</div>
                    <div style={styles.legDetail}>{leg.to}</div>
                    <div style={styles.time}>{leg.arr}</div>
                    <div style={styles.note}>{leg.note}</div>
                  </div>
                ))}
              </div>
            ))}

            <h2 style={styles.sectionTitle}>Home Base</h2>
            <div style={styles.card}>
              <div>Angela\'s place in Oak Park, Melbourne</div>
              <div style={{ fontSize: '0.9rem', color: '#A9B4A6', marginTop: '8px' }}>Near train line + bus route</div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <h2 style={styles.sectionTitle}>Schedule</h2>
            <div style={styles.card}>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                style={{ ...styles.input, marginBottom: '8px' }}
              />
              <input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                style={{ ...styles.input, marginBottom: '8px' }}
              />
              <input
                type="text"
                placeholder="Event title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                style={{ ...styles.input, marginBottom: '8px' }}
              />
              <button
                onClick={() => {
                  if (newEventDate && newEventTime && newEventTitle) {
                    updateTripData({
                      schedule: [
                        ...tripData.schedule,
                        { id: uid(), date: newEventDate, time: newEventTime, title: newEventTitle, who: 'all' }
                      ]
                    });
                    setNewEventDate('');
                    setNewEventTime('');
                    setNewEventTitle('');
                  }
                }}
                style={styles.btn}
              >
                Add Event
              </button>
            </div>
            {tripData.schedule.map(event => (
              <div key={event.id} style={styles.eventItem}>
                <div>
                  <div style={styles.cardTitle}>{event.title}</div>
                  <div style={styles.cardMeta}>{event.date} at {event.time}</div>
                </div>
                <button
                  onClick={() => updateTripData({
                    schedule: tripData.schedule.filter(e => e.id !== event.id)
                  })}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
            <h2 style={styles.sectionTitle}>Itinerary</h2>
            {tripData.itinerary.map(stop => (
              <div key={stop.id} style={styles.card}>
                <div style={styles.itinHeader}>
                  <span style={styles.emoji}>{stop.emoji}</span>
                  <div>
                    <div style={styles.cardTitle}>{stop.location}</div>
                    <div style={styles.cardMeta}>{stop.nights} nights starting {stop.startDate}</div>
                  </div>
                </div>
                <div style={{ marginTop: '12px', color: '#A9B4A6' }}>{stop.description}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {stop.tags.map(tag => (
                    <span key={tag} style={styles.tagBadge}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'checklists' && (
          <div>
            <h2 style={styles.sectionTitle}>Checklists</h2>
            {tripData.checklists.map(list => (
              <div key={list.id} style={styles.card}>
                <div style={styles.checklistHeader}>
                  <div style={styles.cardTitle}>{list.name}</div>
                  <div style={styles.progress}>{list.items.filter(i => i.done).length}/{list.items.length}</div>
                </div>
                {list.items.map(item => (
                  <label key={item.id} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={(e) => {
                        const newChecklists = tripData.checklists.map(c =>
                          c.id === list.id
                            ? { ...c, items: c.items.map(i => i.id === item.id ? { ...i, done: e.target.checked } : i) }
                            : c
                        );
                        updateTripData({ checklists: newChecklists });
                      }}
                    />
                    <span style={{ textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? 0.6 : 1 }}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'budget' && (
          <div>
            <h2 style={styles.sectionTitle}>Budget</h2>
            {tripData.budget.map(item => (
              <div key={item.id} style={styles.card}>
                <div style={styles.budgetRow}>
                  <div>
                    <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>{item.icon}</span>
                    <span style={styles.cardTitle}>{item.category}</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', color: '#D4894A', fontWeight: 'bold' }}>${item.amount.toLocaleString()}</div>
                </div>
                <div style={styles.cardMeta}>{item.note}</div>
              </div>
            ))}
            <div style={{ ...styles.card, background: 'rgba(196, 98, 45, 0.1)', borderTop: '2px solid #C4622D', marginTop: '12px' }}>
              <div style={styles.budgetRow}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total Budget</div>
                <div style={{ fontSize: '1.3rem', color: '#C4622D', fontWeight: 'bold' }}>${tripData.budget.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div>
            <h2 style={styles.sectionTitle}>Day Trip Ideas</h2>
            <div style={styles.filterRow}>
              {['all', 'reef', 'wildlife', 'beach', 'kids', 'mini trip', 'in town'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setDayTripFilter(tag)}
                  style={{
                    ...styles.filterBtn,
                    borderColor: dayTripFilter === tag ? '#D4894A' : 'rgba(232, 213, 176, 0.3)',
                    color: dayTripFilter === tag ? '#D4894A' : 'rgba(232, 213, 176, 0.6)',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            {tripData.dayTrips
              .filter(trip => dayTripFilter === 'all' || trip.tag === dayTripFilter)
              .map(trip => (
                <div key={trip.id} style={styles.card}>
                  <div style={styles.tripHeader}>
                    <div>
                      <div style={styles.cardTitle}>{trip.name}</div>
                      <div style={styles.cardMeta}>{trip.timeframe}</div>
                    </div>
                    <button
                      onClick={() => {
                        const newTrips = tripData.dayTrips.map(t =>
                          t.id === trip.id ? { ...t, votes: t.votes + 1 } : t
                        );
                        updateTripData({ dayTrips: newTrips });
                      }}
                      style={styles.voteBtn}
                    >
                      👍 {trip.votes}
                    </button>
                  </div>
                  <div style={{ marginTop: '8px', color: '#A9B4A6' }}>{trip.description}</div>
                  <span style={styles.tagBadge}>{trip.tag}</span>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 style={styles.sectionTitle}>Contacts</h2>
            <div style={styles.contactsGrid}>
              {tripData.contacts.map(contact => (
                <div key={contact.id} style={styles.card}>
                  <div style={styles.cardTitle}>{contact.name}</div>
                  <div style={styles.cardMeta}>{contact.location}</div>
                  {contact.notes && <div style={{ fontSize: '0.85rem', marginTop: '8px', color: '#A9B4A6' }}>{contact.notes}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div>
            <h2 style={styles.sectionTitle}>Travel Docs</h2>
            {tripData.docs.map(doc => (
              <div key={doc.id} style={styles.card}>
                <div style={styles.cardTitle}>{doc.label}</div>
                <div style={{ ...styles.cardMeta, marginTop: '8px', fontFamily: 'monospace', fontSize: '0.9rem' }}>{doc.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <h2 style={styles.sectionTitle}>Trip Notes</h2>
            <textarea
              value={tripData.notes}
              onChange={(e) => updateTripData({ notes: e.target.value })}
              style={{ ...styles.textarea, minHeight: '300px', width: '100%' }}
            />
          </div>
        )}
      </div>

      {isSaving && <div style={styles.savingIndicator}>Saving...</div>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: '#0D1B2A',
    color: '#F5EFE0',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  mainTitle: {
    fontSize: '3rem',
    marginBottom: '8px',
    color: '#D4894A',
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#A9B4A6',
    marginBottom: '24px',
  },
  tabBar: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tabBtn: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#D4894A',
    marginBottom: '16px',
    marginTop: '32px',
    fontFamily: "'Playfair Display', serif",
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(212, 137, 74, 0.2)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
  },
  crewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#FDFAF4',
  },
  cardMeta: {
    fontSize: '0.9rem',
    color: '#A9B4A6',
    marginTop: '4px',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(232, 213, 176, 0.12)',
    borderRadius: '6px',
    color: '#F5EFE0',
    padding: '8px 12px',
    fontSize: '0.95rem',
    width: '100%',
  },
  btn: {
    background: '#C4622D',
    border: 'none',
    color: '#FDFAF4',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    width: '100%',
  },
  legTitle: {
    color: '#D4894A',
    marginBottom: '8px',
  },
  legDetail: {
    fontSize: '0.9rem',
    marginBottom: '6px',
  },
  time: {
    color: '#D4894A',
    fontWeight: 'bold',
    marginLeft: '8px',
  },
  arrow: {
    textAlign: 'center',
    color: '#D4894A',
    margin: '8px 0',
  },
  note: {
    fontSize: '0.75rem',
    color: '#A9B4A6',
    marginTop: '8px',
  },
  formRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '12px',
  },
  textarea: {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(232, 213, 176, 0.12)',
    borderRadius: '8px',
    color: '#F5EFE0',
    fontFamily: 'inherit',
    padding: '12px',
    resize: 'vertical',
  },
  checklistHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  progress: {
    color: '#D4894A',
    fontWeight: 'bold',
  },
  checkboxLabel: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 0',
  },
  budgetRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  filterRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px dashed rgba(232, 213, 176, 0.3)',
    background: 'transparent',
    color: 'rgba(232, 213, 176, 0.6)',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  tripHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '8px',
  },
  tagBadge: {
    fontSize: '0.7rem',
    color: '#D4894A',
    border: '1px dashed #D4894A',
    borderRadius: '12px',
    padding: '3px 10px',
    whiteSpace: 'nowrap',
  },
  voteBtn: {
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px dashed rgba(232, 213, 176, 0.3)',
    background: 'transparent',
    color: 'rgba(232, 213, 176, 0.6)',
    cursor: 'pointer',
  },
  contactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
  },
  eventItem: {
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '6px',
    marginBottom: '8px',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '12px',
    alignItems: 'center',
  },
  deleteBtn: {
    background: 'none',
    border: '1px solid #B83232',
    color: '#B83232',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '0.75rem',
  },
  emoji: {
    fontSize: '1.5rem',
  },
  itinHeader: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '12px',
  },
  savingIndicator: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: '#C4622D',
    color: '#FDFAF4',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '0.85rem',
  },
};
