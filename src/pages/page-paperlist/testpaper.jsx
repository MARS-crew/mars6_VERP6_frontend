"use client"


export default function DocumentList() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-bold">VER6</h1>
        <span className="text-gray-600">chhari0708</span>
      </div>

      <div className="max-w-3xl mx-auto p-6 w-[70rem]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">기획서</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <span>수정아이콘콘</span>
          </button>
        </div>

        {/* Document List */}
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          {/* Document Item 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">Todo list 앱 기획서 🚀</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "35%" }} />
                <div className="h-full bg-gray-400 rounded-full" style={{ width: "30%", marginLeft: "35%" }} />
                <div className="h-full bg-gray-300 rounded-full" style={{ width: "35%", marginLeft: "65%" }} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm">V0.4 웹 기획서_2025.ppt</p>
                <span className="text-xs text-gray-500">1일전</span>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <span></span>
                  <img src="../../assets/icon-pencil.png" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <span>수정아이콘콘</span>
                </button>
              </div>
            </div>
          </div>

          {/* Document Item 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">V0.4 웹 기획서_2025.ppt</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "70%" }} />
                <div className="h-full bg-gray-400 rounded-full" style={{ width: "15%", marginLeft: "70%" }} />
                <div className="h-full bg-gray-300 rounded-full" style={{ width: "15%", marginLeft: "85%" }} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">1일전</span>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <span>수정아이콘콘</span>
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <span>수정아이콘콘</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add Button */}
          <button className="w-full py-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center mt-4">
          <span>수정아이콘콘</span>
          </button>
        </div>
      </div>
    </div>
  )
}

