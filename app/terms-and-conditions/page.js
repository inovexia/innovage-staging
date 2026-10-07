import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions that govern your use of the innovagesoft.com website and its related services.',
};

// Copy from the live page at https://innovagesoft.com/terms-and-condition/
// TODO: review with legal before launch — the live copy names "Innovage Software Services Private Limited"
// with Uttar Pradesh, India jurisdiction (the privacy policy names Innovage Softwares Inc., Ontario), and its
// "Intellectual property rights" section repeats the privacy policy's data-retention paragraph.
const intro = [
  'These terms and conditions (“Agreement”) sets forth the general terms and conditions of your use of the innovagesoft.com website (“Website” or “Service”) and any of its related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and Innovage Software Services Private Limited. (“Innovage Software”, “Innovage Software Services Private Limited “, “ISSPL”, “we”, “us” or “our”). By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. If you are entering into this Agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this Agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this Agreement, you must not accept this Agreement and may not access and use the Website and Services. You acknowledge that this Agreement is a contract between you and Innovage Software Services Private Limited, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.',
];

const sections = [
  {
    id: 'billing-and-payments',
    title: 'Billing and payments',
    body: [
      { p: 'You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.' },
    ],
  },
  {
    id: 'accuracy-of-information',
    title: 'Accuracy of information',
    body: [
      { p: 'Occasionally there may be information on the Website that contains typographical errors, inaccuracies or omissions that may relate to pricing, availability, promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Website or Services is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information on the Website including, without limitation, pricing information, except as required by law. No specified update or refresh date applied on the Website should be taken to indicate that all information on the Website or Services has been modified or updated.' },
    ],
  },
  {
    id: 'links-to-other-resources',
    title: 'Links to other resources',
    body: [
      { p: 'Although the Website and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Website and Services. Your linking to any other off-site resources is at your own risk.' },
    ],
  },
  {
    id: 'prohibited-uses',
    title: 'Prohibited uses',
    body: [
      { p: 'In addition to other terms as set forth in the Agreement, you are prohibited from using the Website and Services or Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website and Services, third party products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent the security features of the Website and Services, third party products and services, or the Internet. We reserve the right to terminate your use of the Website and Services for violating any of the prohibited uses.' },
    ],
  },
  {
    id: 'intellectual-property-rights',
    title: 'Intellectual property rights',
    body: [
      { p: 'We will retain and use your Personal Information for the period necessary to comply with our legal obligations, resolve disputes, and enforce our agreements unless a longer retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, Personal Information shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after the expiration of the retention period.' },
    ],
  },
  {
    id: 'disclaimer-of-warranty',
    title: 'Disclaimer of warranty',
    body: [
      { p: 'You agree that such Service is provided on an “as is” and “as available” basis and that your use of the Website and Services is solely at your own risk. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that the Services will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free; nor do we make any warranty as to the results that may be obtained from the use of the Service or as to the accuracy or reliability of any information obtained through the Service or that defects in the Service will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of Service is done at your own discretion and risk and that you will be solely responsible for any damage or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through the Service or any transactions entered into through the Service unless stated otherwise. No advice or information, whether oral or written, obtained by you from us or through the Service shall create any warranty not expressly made herein.' },
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of liability',
    body: [
      { p: 'To the fullest extent permitted by applicable law, in no event will Innovage Software Services Private Limited, its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if the liable party has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Innovage Software Services Private Limited and its affiliates, officers, employees, agents, suppliers and licensors relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Innovage Software Services Private Limited for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.' },
    ],
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    body: [
      { p: 'You agree to indemnify and hold Innovage Software Services Private Limited and its affiliates, directors, officers, employees, agents, suppliers and licensors harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys’ fees, incurred in connection with or arising from any third party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Website and Services or any willful misconduct on your part.' },
    ],
  },
  {
    id: 'severability',
    title: 'Severability',
    body: [
      { p: 'All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.' },
    ],
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute resolution',
    body: [
      { p: 'The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Uttar Pradesh, India without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of India. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Gorakhpur, Uttar Pradesh, India and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.' },
    ],
  },
  {
    id: 'changes-and-amendments',
    title: 'Changes and amendments',
    body: [
      { p: 'We reserve the right to modify this Agreement or its terms relating to the Website and Services at any time, effective upon posting of an updated version of this Agreement on the Website. When we do, we will revise the updated date at the bottom of this page. Continued use of the Website and Services after any such changes shall constitute your consent to such changes.' },
    ],
  },
  {
    id: 'acceptance-of-these-terms',
    title: 'Acceptance of these terms',
    body: [
      { p: 'You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services.' },
    ],
  },
  {
    id: 'contacting-us',
    title: 'Contacting us',
    body: [{ contact: true }],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms &"
      accent="Conditions"
      text="The terms that govern your use of our website and services."
      crumb="Terms & Conditions"
      intro={intro}
      sections={sections}
      subject="Policy"
      contactTitle="Questions about these terms?"
    />
  );
}
