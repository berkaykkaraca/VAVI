# VAVI Product Backlog

## Epic 1: Camera Integration & Image Preprocessing

### 1.1 Integrate CameraX for Real-Time Video Feed
- **User Story:** As a user, I want the app to access my phone's camera and provide a real-time video feed for object detection.
- **Acceptance Criteria:**
  - CameraX is initialized and streams video in real time.
  - The video feed is accessible to the detection pipeline.
- **Assignee:** Berkay Kaan Karaca
- **Priority:** High

### 1.2 Implement YUV to RGB Image Conversion
- **User Story:** As a developer, I need to convert camera frames from YUV to RGB so the model can process them.
- **Acceptance Criteria:**
  - YUV frames are converted to RGB with minimal latency.
  - Output images are compatible with the TFLite model input.
- **Assignee:** Berkay Kaan Karaca
- **Priority:** High

---

## Epic 2: Model Integration & Inference

### 2.1 Load YOLOv5n TFLite Model
- **User Story:** As a user, I want the app to load the YOLOv5n TFLite model on startup for offline object detection.
- **Acceptance Criteria:**
  - Model loads successfully on app launch.
  - Errors are handled gracefully.
- **Assignee:** Ceyda Kuşçuoğlu
- **Priority:** High

### 2.2 Run Real-Time Inference on Camera Frames
- **User Story:** As a user, I want the app to detect people in real time using the camera feed and the loaded model.
- **Acceptance Criteria:**
  - Inference runs at a minimum of 10 FPS on target devices.
  - Detected persons are output with bounding box coordinates.
- **Assignee:** Ceyda Kuşçuoğlu
- **Priority:** High

### 2.3 Optimize Model Inference for Performance
- **User Story:** As a user, I want the app to run smoothly without lag during detection.
- **Acceptance Criteria:**
  - Inference time per frame is minimized.
  - App remains responsive during detection.
- **Assignee:** Ceyda Kuşçuoğlu
- **Priority:** Medium

---

## Epic 3: Audio Feedback System

### 3.1 Implement Stereo Audio Feedback Based on Object Position
- **User Story:** As a user, I want to hear beeps from the left or right ear depending on where a person is detected in the camera view.
- **Acceptance Criteria:**
  - Audio feedback is spatialized (left/right) based on bounding box position.
  - Feedback is immediate and synchronized with detection.
- **Assignee:** Kıvanç Terzioğlu
- **Priority:** High

### 3.2 Encode Distance Information in Beep Frequency
- **User Story:** As a user, I want the beep frequency to change based on how close a detected person is, so I can judge distance.
- **Acceptance Criteria:**
  - Beep frequency increases as detected person gets closer.
  - Frequency mapping is intuitive and tested with users.
- **Assignee:** Kıvanç Terzioğlu
- **Priority:** High

---

## Epic 4: Offline & Connectivity Support

### 4.1 Ensure Full Offline Functionality
- **User Story:** As a user, I want the app to work without an internet connection so I can use it anywhere.
- **Acceptance Criteria:**
  - All detection and feedback features work offline.
  - No cloud dependencies for core functionality.
- **Assignee:** Berkay Kaan Karaca
- **Priority:** High

### 4.2 Support Mobile Hotspot for Updates
- **User Story:** As a user, I want to be able to update the app or model via a mobile hotspot if needed.
- **Acceptance Criteria:**
  - App can check for and download updates over a hotspot.
  - Updates are optional and do not block offline use.
- **Assignee:** Berkay Kaan Karaca
- **Priority:** Medium

---

## Epic 5: Accessibility-Focused UI

### 5.1 Design High-Contrast, Simple UI
- **User Story:** As a visually impaired user, I want a high-contrast, uncluttered UI so I can use the app easily.
- **Acceptance Criteria:**
  - UI uses large, high-contrast elements.
  - Minimal text and clear icons.
- **Assignee:** Ceyda Kuşçuoğlu
- **Priority:** High

### 5.2 Integrate TalkBack and Screen Reader Support
- **User Story:** As a user, I want the app to be fully usable with TalkBack and other screen readers.
- **Acceptance Criteria:**
  - All UI elements are accessible via TalkBack.
  - App provides spoken feedback for all actions.
- **Assignee:** Ceyda Kuşçuoğlu
- **Priority:** High

---

## Epic 6: Indoor Navigation Preparation

### 6.1 Implement Basic Environment Mapping (Mock Layouts)
- **User Story:** As a user, I want the app to provide basic indoor navigation using mock layouts for testing.
- **Acceptance Criteria:**
  - App can load and display/test with simple indoor maps.
  - Navigation logic is prepared for future expansion.
- **Assignee:** Kıvanç Terzioğlu
- **Priority:** Medium

### 6.2 Prepare for Future Integration with Real Indoor Maps
- **User Story:** As a developer, I want the codebase to be ready for future integration with real indoor mapping solutions.
- **Acceptance Criteria:**
  - Code is modular and documented for future mapping features.
  - Mock navigation can be easily replaced with real data.
- **Assignee:** Kıvanç Terzioğlu
- **Priority:** Low

---

## Summary Table

| Epic | User Story | Assignee | Priority |
|------|------------|----------|----------|
| Camera Integration & Preprocessing | 1.1, 1.2 | Berkay Kaan Karaca | High |
| Model Integration & Inference | 2.1, 2.2, 2.3 | Ceyda Kuşçuoğlu | High, High, Medium |
| Audio Feedback System | 3.1, 3.2 | Kıvanç Terzioğlu | High |
| Offline & Connectivity | 4.1, 4.2 | Berkay Kaan Karaca | High, Medium |
| Accessibility UI | 5.1, 5.2 | Ceyda Kuşçuoğlu | High |
| Indoor Navigation | 6.1, 6.2 | Kıvanç Terzioğlu | Medium, Low | 