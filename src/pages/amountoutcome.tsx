import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Question, Balance } from '../types';
import { X, TrendingUp, AlertCircle } from 'lucide-react';

interface PredictionModalProps {
  questionId: string;
  eventId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PredictionModal({ questionId, eventId, onClose, onSuccess }: PredictionModalProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [questionId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [questionResponse, balanceResponse] = await Promise.all([
        api.post<{ event: any; questions: Question[]; status: { type: string } }>('/event/v1/getevent', {
          eventId,
          getEventQuestions: true,
          questionsPageInfo: { pageNumber: 1, pageSize: 50 },
        }),
        api.post<Balance & { status: { type: string } }>('/balances/v1/get', {}),
      ]);

      const foundQuestion = questionResponse.questions?.find(q => q.questionId === questionId);
      if (foundQuestion) {
        setQuestion(foundQuestion);
      }

      if (balanceResponse.status.type === 'SUCCESS') {
        setBalance(balanceResponse);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load prediction data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedOutcome) {
      setError('Please select an outcome');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (balance && parseFloat(amount) > parseFloat(balance.availableBalance)) {
      setError('Insufficient balance');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post<{ orderId: string; status: { type: string } }>('/order/v1/createorder', {
        eventId,
        questionId,
        amount,
        predictionDetails: {
          selectedPredictionOutcome: selectedOutcome,
          selectedPredictionChoice: true,
        },
        modifiers: {
          percentage: '0.50000000',
          updatedPercentage: '0.50000000',
        },
      });

      if (response.status.type === 'SUCCESS') {
        onSuccess();
        onClose();
      } else {
        setError('Failed to create prediction');
      }
    } catch (error) {
      console.error('Failed to create prediction:', error);
      setError('Failed to create prediction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Make Prediction</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{question.name}</h3>
            {question.description && (
              <p className="text-sm text-gray-600">{question.description}</p>
            )}
          </div>

          {balance && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Available Balance</span>
                <span className="text-xl font-bold text-blue-600">
                  ${parseFloat(balance.availableBalance).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Outcome
            </label>
            <div className="space-y-2">
              {question.activity?.marketDataDetails?.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedOutcome(option.outcome)}
                  className={`w-full border rounded-lg p-4 text-left transition ${
                    selectedOutcome === option.outcome
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{option.outcome}</span>
                    <span className="text-lg font-bold text-blue-600">
                      {parseFloat(option.impliedProbability).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${parseFloat(option.impliedProbability)}%` }}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Invest
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="0.00"
                required
              />
            </div>
            {balance && amount && parseFloat(amount) > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Remaining balance: ${(parseFloat(balance.availableBalance) - parseFloat(amount)).toFixed(2)}
              </p>
            )}
          </div>

          {selectedOutcome && amount && parseFloat(amount) > 0 && question.activity?.marketDataDetails && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Potential Returns</h4>
              {(() => {
                const selectedOption = question.activity.marketDataDetails.find(
                  o => o.outcome === selectedOutcome
                );
                if (!selectedOption) return null;

                const probability = parseFloat(selectedOption.impliedProbability) / 100;
                const potentialReturn = parseFloat(amount) / probability;
                const profit = potentialReturn - parseFloat(amount);

                return (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment</span>
                      <span className="font-medium">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potential Profit</span>
                      <span className="font-bold text-green-600">+${profit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-900 font-medium">Total Return</span>
                      <span className="font-bold text-gray-900">${potentialReturn.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedOutcome || !amount}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Placing...' : 'Place Prediction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
