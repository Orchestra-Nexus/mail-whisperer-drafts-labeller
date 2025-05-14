
export const emailData = [
  {
    id: '1',
    subject: 'Weekly Project Update - Q2 Goals Progress',
    sender: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com'
    },
    preview: 'Hey team, I wanted to share our progress on Q2 goals. We\'ve achieved 85% of our targets...',
    body: `<p>Hey team,</p>
    <p>I wanted to share our progress on Q2 goals. We've achieved 85% of our targets and we're on track to complete everything by the end of the quarter.</p>
    <p>Key achievements:</p>
    <ul>
      <li>Launched the new dashboard feature</li>
      <li>Reduced loading time by 40%</li>
      <li>Onboarded 5 new enterprise clients</li>
    </ul>
    <p>Let's discuss more in our weekly meeting.</p>
    <p>Best,<br>Alex</p>`,
    isRead: false,
    isStarred: true,
    labels: ['work'],
    date: new Date('2025-05-13T10:30:00')
  },
  {
    id: '2',
    subject: 'Dinner plans for Saturday?',
    sender: {
      name: 'Samantha Lee',
      email: 'sam.lee@example.com'
    },
    preview: 'Hi! Just wondering if you're free for dinner this Saturday? There\'s a new restaurant...',
    body: `<p>Hi!</p>
    <p>Just wondering if you're free for dinner this Saturday? There's a new restaurant downtown that I've been wanting to try. They have amazing reviews for their pasta dishes.</p>
    <p>Let me know if you're interested and I'll make a reservation for around 7pm.</p>
    <p>Cheers,<br>Sam</p>`,
    isRead: true,
    isStarred: false,
    labels: ['personal'],
    date: new Date('2025-05-12T18:45:00')
  },
  {
    id: '3',
    subject: 'Your Monthly Account Statement',
    sender: {
      name: 'Bank of America',
      email: 'statements@bankofamerica.com'
    },
    preview: 'Your monthly account statement for April 2025 is now available. Please log in to view...',
    body: `<p>Dear Valued Customer,</p>
    <p>Your monthly account statement for April 2025 is now available. Please log in to your online banking portal to view the complete statement.</p>
    <p>Account Summary:</p>
    <ul>
      <li>Previous Balance: $2,450.65</li>
      <li>Deposits and Credits: $3,200.00</li>
      <li>Withdrawals and Debits: $1,875.32</li>
      <li>Current Balance: $3,775.33</li>
    </ul>
    <p>If you notice any discrepancies, please contact our customer service.</p>
    <p>Thank you for banking with us.</p>`,
    isRead: false,
    isStarred: false,
    labels: ['finance'],
    date: new Date('2025-05-10T08:15:00')
  },
  {
    id: '4',
    subject: 'New comment on your post',
    sender: {
      name: 'LinkedIn',
      email: 'notifications@linkedin.com'
    },
    preview: 'Michael Chen commented on your post: "Great insights! I particularly agree with your point about...',
    body: `<p>Michael Chen commented on your post:</p>
    <blockquote>"Great insights! I particularly agree with your point about digital transformation. Would love to connect and discuss more about AI implementation strategies."</blockquote>
    <p>View the comment and respond: [Link]</p>`,
    isRead: true,
    isStarred: false,
    labels: ['social'],
    date: new Date('2025-05-09T15:20:00')
  },
  {
    id: '5',
    subject: 'Final reminder: Tax filing deadline',
    sender: {
      name: 'TaxPro Advisors',
      email: 'reminders@taxpro.com'
    },
    preview: 'This is a final reminder that the extended tax filing deadline is approaching. Please submit...',
    body: `<p>Dear Client,</p>
    <p>This is a final reminder that the extended tax filing deadline is approaching. Please submit any remaining documents by May 15th to ensure timely processing.</p>
    <p>Documents needed:</p>
    <ul>
      <li>W-2 forms</li>
      <li>1099 forms</li>
      <li>Deduction receipts</li>
      <li>Self-employment records</li>
    </ul>
    <p>Feel free to contact your assigned tax advisor with any questions.</p>
    <p>Regards,<br>TaxPro Advisors Team</p>`,
    isRead: false,
    isStarred: true,
    labels: ['finance', 'work'],
    date: new Date('2025-05-08T09:00:00')
  },
  {
    id: '6',
    subject: 'Let\'s catch up soon!',
    sender: {
      name: 'Chris Williams',
      email: 'chris.w@example.com'
    },
    preview: 'Hey! It\'s been too long since we last caught up. How\'s life treating you? I recently moved to...',
    body: `<p>Hey!</p>
    <p>It's been too long since we last caught up. How's life treating you?</p>
    <p>I recently moved to San Francisco for a new job and loving it so far. The tech scene here is amazing, and the food options are incredible.</p>
    <p>Would love to hear what you've been up to. Maybe we can schedule a video call sometime next week?</p>
    <p>Take care,<br>Chris</p>`,
    isRead: true,
    isStarred: false,
    labels: ['personal'],
    date: new Date('2025-05-07T21:10:00')
  },
  {
    id: '7',
    subject: 'Your flight confirmation for SFO > NYC',
    sender: {
      name: 'United Airlines',
      email: 'confirmation@united.com'
    },
    preview: 'Your upcoming flight from San Francisco to New York on May 20th is confirmed. Confirmation code: UA472X...',
    body: `<p>Your upcoming flight from San Francisco to New York on May 20th is confirmed.</p>
    <p><strong>Confirmation code:</strong> UA472X</p>
    <p><strong>Flight details:</strong></p>
    <ul>
      <li>Flight: UA1234</li>
      <li>Date: May 20, 2025</li>
      <li>Departure: San Francisco (SFO) at 7:45 AM</li>
      <li>Arrival: New York (JFK) at 4:10 PM</li>
      <li>Seat: 14C (Economy Plus)</li>
    </ul>
    <p>Check-in opens 24 hours before your flight.</p>
    <p>Thank you for choosing United Airlines.</p>`,
    isRead: false,
    isStarred: false,
    labels: ['personal', 'work'],
    date: new Date('2025-05-06T14:30:00')
  },
  {
    id: '8',
    subject: 'Login attempt from new device',
    sender: {
      name: 'Google Security',
      email: 'security@google.com'
    },
    preview: 'We detected a login attempt from a new device located in Boston, MA. If this was you, no action is needed...',
    body: `<p>We detected a login attempt from a new device located in Boston, MA.</p>
    <p><strong>Device details:</strong></p>
    <ul>
      <li>Device: MacBook Pro</li>
      <li>Location: Boston, MA, USA</li>
      <li>Time: May 5, 2025, 11:42 AM EST</li>
      <li>Browser: Chrome 108.0.5359.124</li>
    </ul>
    <p>If this was you, no action is needed. If you don't recognize this login attempt, please secure your account immediately by changing your password and enabling two-factor authentication.</p>
    <p>-Google Security Team</p>`,
    isRead: true,
    isStarred: true,
    labels: [],
    date: new Date('2025-05-05T11:42:00')
  },
  {
    id: '9',
    subject: 'Welcome to Premium Subscription',
    sender: {
      name: 'Spotify',
      email: 'no-reply@spotify.com'
    },
    preview: 'Thank you for upgrading to Spotify Premium! You now have access to ad-free music streaming, offline listening...',
    body: `<p>Thank you for upgrading to Spotify Premium!</p>
    <p>You now have access to:</p>
    <ul>
      <li>Ad-free music streaming</li>
      <li>Offline listening</li>
      <li>High-quality audio (320 kbps)</li>
      <li>Unlimited skips</li>
    </ul>
    <p>Your billing date will be on the 5th of each month. Your first charge of $9.99 has been processed successfully.</p>
    <p>Enjoy your premium experience!</p>
    <p>-The Spotify Team</p>`,
    isRead: false,
    isStarred: false,
    labels: ['personal'],
    date: new Date('2025-05-05T10:15:00')
  },
  {
    id: '10',
    subject: 'Interview scheduled: Software Engineer position',
    sender: {
      name: 'Tesla Recruiting',
      email: 'recruiting@tesla.com'
    },
    preview: 'We\'re excited to move forward with your application for the Software Engineer position. We\'d like to schedule...',
    body: `<p>We're excited to move forward with your application for the Software Engineer position.</p>
    <p>We'd like to schedule a technical interview with our engineering team. The interview will focus on algorithms, data structures, and system design.</p>
    <p><strong>Available slots:</strong></p>
    <ul>
      <li>May 12, 2025 - 10:00 AM PST</li>
      <li>May 13, 2025 - 2:00 PM PST</li>
      <li>May 14, 2025 - 11:00 AM PST</li>
    </ul>
    <p>Please let us know which time works best for you, or suggest alternative times if none of these work.</p>
    <p>Best regards,<br>Tesla Recruiting Team</p>`,
    isRead: true,
    isStarred: true,
    labels: ['work'],
    date: new Date('2025-05-04T16:50:00')
  },
  {
    id: '11',
    subject: 'Your order has shipped',
    sender: {
      name: 'Amazon',
      email: 'ship-confirm@amazon.com'
    },
    preview: 'Your order #112-7366941-2478603 has shipped. Expected delivery date: May 7, 2025. You can track your package...',
    body: `<p>Your order #112-7366941-2478603 has shipped.</p>
    <p><strong>Items:</strong></p>
    <ul>
      <li>Wireless Noise-Canceling Headphones - $249.99</li>
      <li>USB-C Charging Cable (2-pack) - $12.99</li>
    </ul>
    <p><strong>Expected delivery date:</strong> May 7, 2025</p>
    <p>You can track your package with the following tracking number: UPS9834765128</p>
    <p>Thank you for shopping with Amazon!</p>`,
    isRead: false,
    isStarred: false,
    labels: ['personal'],
    date: new Date('2025-05-03T13:25:00')
  },
  {
    id: '12',
    subject: 'Team building event next Friday',
    sender: {
      name: 'HR Department',
      email: 'hr@company.com'
    },
    preview: 'We\'re organizing a team building event next Friday at Adventure Park. Activities will include rock climbing...',
    body: `<p>Hello Team,</p>
    <p>We're organizing a team building event next Friday at Adventure Park.</p>
    <p><strong>Details:</strong></p>
    <ul>
      <li>Date: May 16, 2025</li>
      <li>Time: 1:00 PM - 5:00 PM</li>
      <li>Location: Adventure Park, 123 Main St</li>
      <li>Activities: Rock climbing, team challenges, BBQ</li>
    </ul>
    <p>Please wear comfortable clothes and bring a water bottle. Transportation will be provided from the office.</p>
    <p>Please confirm your attendance by May 10th.</p>
    <p>Best regards,<br>HR Department</p>`,
    isRead: true,
    isStarred: false,
    labels: ['work'],
    date: new Date('2025-05-02T10:00:00')
  }
];
