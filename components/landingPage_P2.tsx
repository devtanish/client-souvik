"use client"

import { useState, useRef, useEffect } from "react"
import "@/components/styles/jewelry-customizer.css"

export default function JewelryCustomizer() {
  // State management
  const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({})
  const [selections, setSelections] = useState({
    jewelryPiece: "Jewelry Piece",
    recipient: "Myself",
    occasion: "a Personal Milestone",
    budget: "$150 - $500",
    personalTouches: "add personal touches...",
  })
  const [multiSelectValues, setMultiSelectValues] = useState<{ [key: string]: string[] }>({
    jewelryPiece: [],
    personalTouches: [],
  })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownStates({})
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (key: string) => {
    setDropdownStates((prev) => ({
      ...Object.keys(prev).reduce((acc, k) => ({ ...acc, [k]: false }), {}),
      [key]: !prev[key],
    }))
  }

  const handleSingleSelect = (key: string, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }))
    setDropdownStates({})
  }

  const handleMultiSelectConfirm = (key: string) => {
    if (multiSelectValues[key]?.length > 0) {
      setSelections((prev) => ({
        ...prev,
        [key]: multiSelectValues[key].join(", ")
      }))
    }
    setDropdownStates({})
  }

  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    setMultiSelectValues((prev) => ({
      ...prev,
      [key]: checked ? [...(prev[key] || []), value] : (prev[key] || []).filter((v) => v !== value),
    }))
  }

  const handleShowInspiration = () => {
    let alertMessage = `Finding inspiration for "${selections.jewelryPiece}" for "${selections.recipient}" to celebrate "${selections.occasion}" with a budget of "${selections.budget}".`

    if (selections.personalTouches !== "add personal touches...") {
      alertMessage += `\nThey are a proud "${selections.personalTouches}".`
    }

    alert(alertMessage)
  }

  return (
    <div id="landingPage2" className="min-h-screen flex items-center justify-center bg-[#eaebe5] scroll-mt-16 ">
      <div className="text-center my-10" ref={containerRef}>
        <div className="customizer-sentence">
          <div className="sentence-part md:text-[2.7rem] text-[1.5rem] mx-1">
            I want to create a
            <div className="dropdown-wrapper multi-select mx-0">
              <button
                className={`dropdown-btn md:text-[2.7rem] text-[1.7rem] ${dropdownStates.jewelryPiece ? "open" : ""}`}
                onClick={() => toggleDropdown("jewelryPiece")}
              >
                <span>{selections.jewelryPiece}</span>
                <i className="icon-arrow"></i>
              </button>
              <div className={`dropdown-menu ${dropdownStates.jewelryPiece ? "show" : ""}`}>
                <div className="menu-header ">Select one or more</div>
                {["Ring", "Earrings", "Necklace", "Bracelet", "Charm"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      value={item}
                      checked={multiSelectValues.jewelryPiece?.includes(item) || false}
                      onChange={(e) => handleCheckboxChange("jewelryPiece", item, e.target.checked)}
                    />
                    {item}
                  </label>
                ))}
                <button className="confirm-selection-btn" onClick={() => handleMultiSelectConfirm("jewelryPiece")}>
                  Confirm
                </button>
              </div>
            </div>
            for
            <div className="dropdown-wrapper">
              <button
                className={`dropdown-btn  ${dropdownStates.recipient ? "open" : ""}`}
                onClick={() => toggleDropdown("recipient")}
              >
                <span>{selections.recipient}</span>
                <i className="icon-arrow "></i>
              </button>
              <div className={`dropdown-menu  ${dropdownStates.recipient ? "show" : ""}`}>
                {["Myself", "My Partner", "My Parent(s)", "My Sibling", "My Best Friend"].map((item) => (
                  <a key={item} onClick={() => handleSingleSelect("recipient", item)}>
                    {item}
                  </a>
                ))}
              </div>
              to celebrate
            </div>
          </div>

          <div className="sentence-part md:text-[2.7rem] text-[1.5rem]">
            <div className="dropdown-wrapper">
              <button
                className={`dropdown-btn ${dropdownStates.occasion ? "open" : ""}`}
                onClick={() => toggleDropdown("occasion")}
              >
                <span>{selections.occasion}</span>
                <i className="icon-arrow"></i>
              </button>
              <div className={`dropdown-menu ${dropdownStates.occasion ? "show" : ""}`}>
                {["a Personal Milestone", "our Anniversary", "a Birthday", "a New Promotion", "just because"].map(
                  (item) => (
                    <a key={item} onClick={() => handleSingleSelect("occasion", item)}>
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>
            and I want to splurge about
            <div className="dropdown-wrapper">
              <button
                className={`dropdown-btn ${dropdownStates.budget ? "open" : ""}`}
                onClick={() => toggleDropdown("budget")}
              >
                <span>{selections.budget}</span>
                <i className="icon-arrow"></i>
              </button>
              <div className={`dropdown-menu ${dropdownStates.budget ? "show" : ""}`}>
                {["$100 - $250", "$250 - $500", "$500 - $800+"].map((item) => (
                  <a key={item} onClick={() => handleSingleSelect("budget", item)}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
            .
          </div>

          <div className="sentence-part optional-part text-[1.5rem] md:text-[2.7rem]">
            <span className="optional-text">(Optional)</span>
            They are a proud
            <div className="dropdown-wrapper multi-select">
              <button
                className={`dropdown-btn ${dropdownStates.personalTouches ? "open" : ""}`}
                onClick={() => toggleDropdown("personalTouches")}
              >
                <span>{selections.personalTouches}</span>
                <i className="icon-arrow"></i>
              </button>
              <div className={`dropdown-menu ${dropdownStates.personalTouches ? "show" : ""}`}>
                <div className="menu-header">Select all that apply</div>
                {["Leo", "Scorpio", "F1 Fan", "Swiftie", "Hindu Heritage", "Nordic Heritage"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      value={item}
                      checked={multiSelectValues.personalTouches?.includes(item) || false}
                      onChange={(e) => handleCheckboxChange("personalTouches", item, e.target.checked)}
                    />
                    {item}
                  </label>
                ))}
                <button className="confirm-selection-btn" onClick={() => handleMultiSelectConfirm("personalTouches")}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="show-inspiration-btn bg-[#925c40]" onClick={handleShowInspiration}>
          Discover My Creation
        </button>

        <p className="secondary-cta">
          ...or, <a href="#">speak to an artisan</a> for a personal consultation.
        </p>
      </div>
    </div>
  )
}
