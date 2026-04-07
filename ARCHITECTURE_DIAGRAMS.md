Presentation Layer :Page,Layout,Component (Hiển thị ui và xử lý action ng dùng/dispatch action/select state -> upd ui)
Business Layer : business logic (ko biết đến tầng nào)
Store Layer: Saga -> reducer --> state (gọi Business layer xử lý business logic/gọi Network layer để call api)
Network Later: call api
