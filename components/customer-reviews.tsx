"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Search, CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import toast from "react-hot-toast"

interface Review {
  id: string
  name: string
  isVerified: boolean
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  notHelpful: number
  userVote?: "helpful" | "not-helpful" | null
}

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Solmaz F.",
    isVerified: true,
    rating: 5,
    title: "Amazing",
    content:
      "Amazing quality and fast shipping. Exactly what I was looking for! The size is perfect and fits beautifully.",
    date: "7/3/2025",
    helpful: 12,
    notHelpful: 1,
    userVote: null,
  },
  {
    id: "2",
    name: "Aimee M.",
    isVerified: true,
    rating: 5,
    title: "Beautiful anklet",
    content:
      "I love this piece! The craftsmanship is excellent and it looks exactly like the photos. The fit is comfortable for all-day wear.",
    date: "6/27/2025",
    helpful: 8,
    notHelpful: 0,
    userVote: null,
  },
  {
    id: "3",
    name: "Nancy G.",
    isVerified: true,
    rating: 5,
    title: "Love it!",
    content:
      "Beautiful and simple. Perfect for everyday wear and special occasions. The look is exactly what I wanted - elegant and timeless.",
    date: "6/19/2025",
    helpful: 15,
    notHelpful: 2,
    userVote: null,
  },
  {
    id: "4",
    name: "Michael R.",
    isVerified: true,
    rating: 4,
    title: "Good quality",
    content:
      "Nice product overall. Shipping was a bit slow but the quality makes up for it. Had some issues with the clasp initially but customer service helped resolve it.",
    date: "6/15/2025",
    helpful: 6,
    notHelpful: 1,
    userVote: null,
  },
  {
    id: "5",
    name: "Sarah L.",
    isVerified: false,
    rating: 3,
    title: "Decent",
    content:
      "It's okay, not exactly what I expected but still usable. The size runs a bit small and the look is different from the website photos.",
    date: "6/10/2025",
    helpful: 3,
    notHelpful: 4,
    userVote: null,
  },
  {
    id: "6",
    name: "David K.",
    isVerified: true,
    rating: 5,
    title: "Excellent purchase",
    content:
      "Highly recommend! Great value for money and excellent customer service. The fit is perfect and the overall look exceeded my expectations.",
    date: "6/5/2025",
    helpful: 20,
    notHelpful: 0,
    userVote: null,
  },
  {
    id: "7",
    name: "Emma T.",
    isVerified: true,
    rating: 2,
    title: "Had issues",
    content:
      "Unfortunately had several issues with this product. The size was wrong despite ordering correctly, and there were quality issues with the finish.",
    date: "6/1/2025",
    helpful: 2,
    notHelpful: 8,
    userVote: null,
  },
  {
    id: "8",
    name: "James W.",
    isVerified: true,
    rating: 4,
    title: "Great fit",
    content:
      "Really happy with the fit and comfort. The size guide was accurate and it looks great. Only minor complaint is the packaging could be better.",
    date: "5/28/2025",
    helpful: 7,
    notHelpful: 1,
    userVote: null,
  },
]

interface Question {
  id: string
  customerName: string
  question: string
  answer: string
  answerBy: string
  date: string
}

const initialQuestions: Question[] = [
  {
    id: "1",
    customerName: "Linda",
    question: "I wanted to order for Christmas but it says ships by Feb 18? Is that correct?",
    answer:
      "Hi Linda, thank you for reaching out! Yes, our Lab Grown Sapphire Huggies are backordered, and they are currently scheduled to be shipped by February 18th.",
    answerBy: "Mejuri",
    date: "12/15/2024",
  },
  {
    id: "2",
    customerName: "Yarden",
    question: "can I take a shower with these ones?",
    answer:
      "Hi Yarden, thank you for reaching out! Our Lab Grown Sapphire Huggies can't be worn when in contact with water, as the gold vermeil may tarnish. Should you prefer a piece that you can wear while showering or swimming, we recommend our 14k pieces. If you have any questions, our Customer Experience Team (contact@mejuri.com) will be more happy to help.",
    answerBy: "Mejuri",
    date: "12/10/2024",
  },
]

function StarRating({
  rating,
  size = "sm",
  interactive = false,
  onRatingChange,
}: {
  rating: number
  size?: "sm" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}) {
  const starSize = size === "lg" ? "h-5 w-5" : "h-4 w-4"

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating
              ? "fill-black text-black"
              : star - 0.5 <= rating
                ? "fill-black/50 text-black"
                : "fill-none text-gray-300"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={() => interactive && onRatingChange?.(star)}
        />
      ))}
    </div>
  )
}

function WriteReviewModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Review submitted successfully! Thank you for your feedback.")

    setIsOpen(false)
    setRating(0)
    setTitle("")
    setContent("")
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-black rounded-none text-black hover:bg-black hover:text-white bg-transparent w-full sm:w-auto text-sm md:text-base px-4 py-2"
        >
          WRITE A REVIEW
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rating">Rating *</Label>
            <div className="mt-2">
              <StarRating rating={rating} size="lg" interactive onRatingChange={setRating} />
            </div>
          </div>
          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-none mt-1"
              placeholder="Summarize your experience"
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Review Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-none mt-1"
              placeholder="Tell others about your experience"
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-none">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-none">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AskQuestionModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Question submitted successfully! We'll get back to you soon.")

    setIsOpen(false)
    setQuestion("")
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-black rounded-none text-black hover:bg-black hover:text-white bg-transparent w-full sm:w-auto text-sm md:text-base px-4 py-2"
        >
          ASK A QUESTION
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="question">Your Question *</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="rounded-none mt-1"
              placeholder="What would you like to know?"
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-none">
              {isSubmitting ? "Submitting..." : "Submit Question"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-none">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("highest-rating")
  const [filterByRating, setFilterByRating] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [questions] = useState<Question[]>(initialQuestions)
  const [activeTab, setActiveTab] = useState<"reviews" | "questions">("reviews")

  // Calculate average rating
  const averageRating = useMemo(() => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  }, [reviews])

  // Handle filter toggle
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    const filtered = reviews.filter((review) => {
      const matchesSearch =
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRating = filterByRating === "all" || review.rating.toString() === filterByRating

      // Filter by active filter keywords
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.some(
          (filter) =>
            review.content.toLowerCase().includes(filter.toLowerCase()) ||
            review.title.toLowerCase().includes(filter.toLowerCase()),
        )

      return matchesSearch && matchesRating && matchesFilters
    })

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "highest-rating":
          return b.rating - a.rating
        case "lowest-rating":
          return a.rating - b.rating
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "most-helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

    return filtered
  }, [reviews, searchQuery, sortBy, filterByRating, activeFilters])

  const handleVote = (reviewId: string, voteType: "helpful" | "not-helpful") => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review.id === reviewId) {
          const newReview = { ...review }

          // Remove previous vote if exists
          if (review.userVote === "helpful") {
            newReview.helpful -= 1
          } else if (review.userVote === "not-helpful") {
            newReview.notHelpful -= 1
          }

          // Add new vote if different from previous
          if (review.userVote !== voteType) {
            if (voteType === "helpful") {
              newReview.helpful += 1
            } else {
              newReview.notHelpful += 1
            }
            newReview.userVote = voteType
          } else {
            newReview.userVote = null
          }

          return newReview
        }
        return review
      }),
    )
  }

  return (
    <div className="max-w-16/17 mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">CUSTOMER REVIEWS</h1>
          <div className="flex items-center gap-3">
            <StarRating rating={averageRating} size="lg" />
            <span className="text-lg font-medium">{averageRating}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <WriteReviewModal />
          <AskQuestionModal />
        </div>
      </div>

      {/* Reviews/Questions Tabs */}
      <div className="border-b border-gray-200 mb-4 md:mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`text-base md:text-lg font-medium pb-4 ${
              activeTab === "reviews" ? "text-black border-b-2 border-black" : "text-gray-500"
            }`}
          >
            REVIEWS ({filteredAndSortedReviews.length})
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`text-base md:text-lg font-medium pb-4 ${
              activeTab === "questions" ? "text-black border-b-2 border-black" : "text-gray-500"
            }`}
          >
            QUESTIONS ({questions.length})
          </button>
        </div>
      </div>

      {/* Search, Filter and Sort - Only show for reviews */}
      {activeTab === "reviews" && (
        <>
          {/* Filter Tags Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Size", "Fit", "Look", "Issues"].map((filter) => (
                <Button
                  key={filter}
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className={`rounded-none px-4 py-1 h-8 text-xs font-medium transition-colors ${
                    activeFilters.includes(filter)
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Reviews"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 w-full rounded-none"
              />
            </div>
          </div>

          {/* Mobile: Side by side dropdowns */}
          <div className="flex gap-3 mb-6 md:mb-8 md:hidden">
            <Select value={filterByRating} onValueChange={setFilterByRating}>
              <SelectTrigger className="flex-1 border-gray-300 rounded-none">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 border-gray-300 rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest-rating">SORT: HIGHEST RATING</SelectItem>
                <SelectItem value="lowest-rating">SORT: LOWEST RATING</SelectItem>
                <SelectItem value="newest">SORT: NEWEST</SelectItem>
                <SelectItem value="oldest">SORT: OLDEST</SelectItem>
                <SelectItem value="most-helpful">SORT: MOST HELPFUL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden md:flex md:items-center md:justify-between mb-6 md:mb-8 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Select value={filterByRating} onValueChange={setFilterByRating}>
                <SelectTrigger className="w-48 border-gray-300 rounded-none">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-64 border-gray-300 rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest-rating">SORT: HIGHEST RATING</SelectItem>
                <SelectItem value="lowest-rating">SORT: LOWEST RATING</SelectItem>
                <SelectItem value="newest">SORT: NEWEST</SelectItem>
                <SelectItem value="oldest">SORT: OLDEST</SelectItem>
                <SelectItem value="most-helpful">SORT: MOST HELPFUL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Questions Section */}
      {activeTab === "questions" && (
        <div className="space-y-6 md:space-y-8">
          {questions.map((question) => (
            <div key={question.id} className="pb-6 md:pb-8 border-b border-gray-100 last:border-b-0">
              <div className="mb-4">
                <h3 className="font-medium text-black mb-2">{question.customerName}</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-medium">Q:</span> {question.question}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-none">
                <h4 className="font-medium text-black mb-2">{question.answerBy}</h4>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-medium">A:</span> {question.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews List - Only show when reviews tab is active */}
      {activeTab === "reviews" && (
        <div className="space-y-6 md:space-y-8">
          {filteredAndSortedReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No reviews found matching your criteria.</div>
          ) : (
            filteredAndSortedReviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col md:flex-row md:gap-6 pb-6 md:pb-8 border-b border-gray-100 last:border-b-0 gap-4"
              >
                {/* User Info */}
                <div className="w-full md:w-48 md:flex-shrink-0">
                  <div className="flex flex-col sm:flex-row md:flex-col justify-between sm:items-center md:items-start gap-2">
                    <h3 className="font-medium text-black">{review.name}</h3>
                    {review.isVerified && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4 fill-current" />
                        <span>Verified buyer</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <h4 className="font-medium text-black mb-1 text-sm md:text-base">{review.title}</h4>
                  <p className="text-gray-700 text-sm md:text-base mb-4">{review.content}</p>

                  {/* Helpful votes */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">Was this helpful?</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-2 ${review.userVote === "helpful" ? "bg-green-100 text-green-700" : ""}`}
                        onClick={() => handleVote(review.id, "helpful")}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {review.helpful}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 px-2 ${review.userVote === "not-helpful" ? "bg-red-100 text-red-700" : ""}`}
                        onClick={() => handleVote(review.id, "not-helpful")}
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {review.notHelpful}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
