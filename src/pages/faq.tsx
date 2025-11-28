import React, { useEffect, useState } from 'react';
import { api } from "@/api/client";
import Navbar from "@/components/Navbar";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await api.post('/misc/v1/faq', {});
        console.log('API Response Data:', data); // Log the API response
        setFaqs((data as { faqs: FaqItem[] }).faqs); // Assuming the API returns an object with a 'faqs' array
      } catch (error: any) {
        console.error('Error fetching FAQs:', error); // Log the full error object
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return <div className="faq-wrapper">Loading FAQs...</div>;
  }

  if (error) {
    return <div className="faq-wrapper">Error: {error}</div>;
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: #0a0f1a;
          color: #d7e1ec;
        }
        .faq-wrapper {
          max-width: 1200px;
          margin: 40px auto;
          text-align: center;
        }
        .faq-wrapper h1 {
          font-size: 45px;
          font-weight: 800;
          color: #4da6ff;
          margin-bottom: 40px;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 35px;
        }
        .faq-item {
          background: linear-gradient(145deg, #0d1326, #080c16);
          padding: 25px 28px;
          border-radius: 16px;
          display: flex;
          gap: 20px;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 8px 8px 15px #060910, -8px -8px 15px #10172a;
        }
        .faq-item:hover {
          transform: translateY(-2px);
          box-shadow: 4px 4px 10px #060910, -4px -4px 10px #10172a;
        }
        .faq-icon {
          background: linear-gradient(145deg, #00e676, #00a85a);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 22px;
          box-shadow: 4px 4px 8px #060910, -4px -4px 8px #10172a;
        }
        .faq-content h4 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #ffffff;
        }
        .faq-content p {
          margin-top: 6px;
          font-size: 15px;
          color: #a7b4c8;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; }
          .faq-wrapper h1 { font-size: 34px; }
        }
      `}</style>
       <Navbar />
      <div className="faq-wrapper">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <div className="faq-item" key={faq.id}>
              {/* <div className="faq-icon">?</div> */}
              <div className="faq-content">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
