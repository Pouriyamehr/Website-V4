import { Card } from "../ui/card";
import { HelpCircle, Mail, Phone, MessageCircle, FileText, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

type Language = "en" | "nl";

interface SupportPageProps {
  language: Language;
}

export function SupportPage({ language }: SupportPageProps) {
  const translations = {
    en: {
      title: "Support",
      subtitle: "Get help with Tropometrics Weather Monitoring",
      contactTitle: "Contact Support",
      contactText: "Our technical support team is available 24/7 to assist with any questions or issues.",
      email: "Email Support",
      emailAddress: "support@tropometrics.com",
      emailDesc: "Response within 2 hours",
      phone: "Phone Support",
      phoneNumber: "+31 20 123 4567",
      phoneDesc: "24/7 emergency line",
      chat: "Live Chat",
      chatDesc: "Available 08:00 - 18:00 CET",
      startChat: "Start Chat",
      resourcesTitle: "Help Resources",
      resources: [
        {
          icon: <FileText className="w-5 h-5" />,
          title: "User Guide",
          description: "Comprehensive documentation for all features",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "API Documentation",
          description: "Technical reference for developers",
        },
        {
          icon: <HelpCircle className="w-5 h-5" />,
          title: "FAQ",
          description: "Answers to common questions",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Video Tutorials",
          description: "Step-by-step visual guides",
        },
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "How often is weather data updated?",
          answer: "Weather data is updated every 15 seconds from our sensor network, ensuring you always have the most current conditions.",
        },
        {
          question: "What should I do if a sensor goes offline?",
          answer: "If a sensor goes offline, check the Sensor Data page for diagnostics. Our system automatically sends alerts to our technical team, who will address the issue within 1 hour.",
        },
        {
          question: "Can I export historical weather data?",
          answer: "Yes, you can export historical data via the API or request a data export through the support team. Data is available for the past 5 years.",
        },
        {
          question: "How are weather alerts configured?",
          answer: "Alerts are automatically configured based on industry-standard safety thresholds. Custom alert thresholds can be configured by contacting our support team.",
        },
      ],
    },
    nl: {
      title: "Ondersteuning",
      subtitle: "Krijg hulp bij Tropometrics Weerbewaking",
      contactTitle: "Contact Ondersteuning",
      contactText: "Ons technische ondersteuningsteam is 24/7 beschikbaar om u te helpen met vragen of problemen.",
      email: "E-mailondersteuning",
      emailAddress: "support@tropometrics.com",
      emailDesc: "Reactie binnen 2 uur",
      phone: "Telefonische Ondersteuning",
      phoneNumber: "+31 20 123 4567",
      phoneDesc: "24/7 noodlijn",
      chat: "Live Chat",
      chatDesc: "Beschikbaar 08:00 - 18:00 CET",
      startChat: "Start Chat",
      resourcesTitle: "Hulpbronnen",
      resources: [
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Gebruikershandleiding",
          description: "Uitgebreide documentatie voor alle functies",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "API Documentatie",
          description: "Technische referentie voor ontwikkelaars",
        },
        {
          icon: <HelpCircle className="w-5 h-5" />,
          title: "Veelgestelde Vragen",
          description: "Antwoorden op veelgestelde vragen",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Video Tutorials",
          description: "Stapsgewijze visuele handleidingen",
        },
      ],
      faqTitle: "Veelgestelde Vragen",
      faqs: [
        {
          question: "Hoe vaak worden weergegevens bijgewerkt?",
          answer: "Weergegevens worden elke 15 seconden bijgewerkt vanuit ons sensornetwerk, zodat u altijd de meest actuele omstandigheden heeft.",
        },
        {
          question: "Wat moet ik doen als een sensor offline gaat?",
          answer: "Als een sensor offline gaat, controleer dan de pagina Sensorgegevens voor diagnostiek. Ons systeem stuurt automatisch waarschuwingen naar ons technisch team, dat het probleem binnen 1 uur zal aanpakken.",
        },
        {
          question: "Kan ik historische weergegevens exporteren?",
          answer: "Ja, u kunt historische gegevens exporteren via de API of een data-export aanvragen via het ondersteuningsteam. Gegevens zijn beschikbaar voor de afgelopen 5 jaar.",
        },
        {
          question: "Hoe worden weerwaarschuwingen geconfigureerd?",
          answer: "Waarschuwingen worden automatisch geconfigureerd op basis van industriestandaard veiligheidsdrempels. Aangepaste waarschuwingsdrempels kunnen worden geconfigureerd door contact op te nemen met ons ondersteuningsteam.",
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Contact Support */}
      <Card className="p-6 mb-6">
        <h3 className="text-gray-900 mb-2">{t.contactTitle}</h3>
        <p className="text-gray-600 mb-6">{t.contactText}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{t.email}</div>
            </div>
            <div className="text-blue-600 mb-1">{t.emailAddress}</div>
            <div className="text-sm text-gray-600">{t.emailDesc}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{t.phone}</div>
            </div>
            <div className="text-blue-600 mb-1">{t.phoneNumber}</div>
            <div className="text-sm text-gray-600">{t.phoneDesc}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-900">{t.chat}</div>
            </div>
            <Button className="w-full mb-2">{t.startChat}</Button>
            <div className="text-sm text-gray-600 text-center">{t.chatDesc}</div>
          </div>
        </div>
      </Card>

      {/* Help Resources */}
      <div className="mb-6">
        <h3 className="text-gray-900 mb-4">{t.resourcesTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.resources.map((resource, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-blue-600">{resource.icon}</div>
                  <div>
                    <div className="text-gray-900">{resource.title}</div>
                    <div className="text-sm text-gray-600">{resource.description}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">{t.faqTitle}</h3>
        <div className="space-y-4">
          {t.faqs.map((faq, index) => (
            <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="text-gray-900 mb-2">{faq.question}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
