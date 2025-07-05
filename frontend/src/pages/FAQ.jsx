import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is Crave Cart?", answer: "Crave Cart is an online food ordering platform where you can browse various restaurants, choose your favorite dishes, and have them delivered to your door." },
    { question: "How do I place an order?", answer: "Login to your account. Choose the restaurant ,pick the items you want to order and add it to the cart. Finally place the order." },
    { question: "How mush does it cost to use Crave cart service?", answer: "Nothing, you will only pay for your order and the shipping is free." },
    { question: "Can I pay using the credit card?", answer: "Yes! we offer a secure payment using the cedit card." },
    { question: "Do you offer discounts or promotions?", answer: "Yes, we regularly offer discounts, special promotions, and deals. " },
    {
      question: "If I have a complaint regarding the order what should I do?",
      answer: (
        <>
          You can call the customer service or send us an email. You will find all our contact information on the{' '}
          <Link to="/contact-us" className="text-yellow-300 underline">Contact Us</Link> page.
        </>
      )
    },
    { question: "Is Crave Cart available in my area?", answer: "Crave Cart operates in various cities. Please enter your zip code on our website to check if we deliver to your location." }
  ];

  const handleToggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-4xl mx-auto p-6 text-[#212121] ">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#7A1523]">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#212121] shadow-lg rounded-lg p-4 duration-300 hover:scale-105">
            <button
              className=" w-full p-5 text-lg font-medium text-orange-400  flex justify-between "
              onClick={() => handleToggle(index)}
            >
              {faq.question}
              <span className="text-yellow-400">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="p-5 text-white bg-[#7A1523] border-t border-yellow-400">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

